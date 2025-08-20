const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const nodemailer = require('nodemailer');

admin.initializeApp();

// Import webhook handler
// Create Order from Stripe Function
exports.createOrderFromStripe = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ success: false, error: 'Method not allowed' });
    return;
  }

  try {
    const { customerName, customerEmail, customerPhone, serviceName, amount, paymentStatus, sessionId, notes } = req.body;

    // Create order data
    const orderData = {
      customerName: customerName || 'Customer',
      email: customerEmail,
      phone: customerPhone || '',
      service: serviceName,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      status: paymentStatus === 'paid' ? 'completed' : 'pending',
      amount: amount / 100, // Convert pence to pounds
      notes: notes || '',
      createdAt: admin.firestore.Timestamp.now(),
      updatedAt: admin.firestore.Timestamp.now()
    };

    // Add to Firestore
    const docRef = await admin.firestore().collection('truthbyshaun_orders').add(orderData);
    
    res.json({ success: true, orderId: docRef.id });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Gmail transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().gmail.email,
    pass: functions.config().gmail.password
  }
});

// Create Checkout Session
exports.createCheckoutSession = functions
  .runWith({ memory: '256MB', timeoutSeconds: 60 })
  .https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  try {
    const { serviceId, customerName, customerEmail } = req.body;
    
    // Define service prices and details
    const serviceConfig = {
      'phone-call-30': { name: 'Phone Call - 30 Minutes', price: 2000, currency: 'gbp' },
      'phone-call-60': { name: 'Phone Call - 1 Hour', price: 3000, currency: 'gbp' },
      'facetime-30': { name: 'FaceTime Mentorship - 30 Minutes', price: 2500, currency: 'gbp' },
      'facetime-60': { name: 'FaceTime Mentorship - 1 Hour', price: 3500, currency: 'gbp' },
      'my-turn-plan-4': { name: 'THE MY TURN PLAN - 4 Week', price: 14900, currency: 'gbp' },
      'my-turn-plan-8': { name: 'THE MY TURN PLAN - 8 Week', price: 19900, currency: 'gbp' }
    };
    
    const service = serviceConfig[serviceId];
    if (!service) {
      res.status(400).json({ error: 'Invalid service type' });
      return;
    }
    
    // Platform (developer) fee and connect account setup
    const developerFeePercent = 0.129; // 12.9%
    const applicationFeeAmount = Math.round(service.price * developerFeePercent);
    const connectAccountId = functions.config().stripe.connect_account_id;
    
    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: service.currency,
          product_data: {
            name: service.name,
            description: `Personal service with Shaun`
          },
          unit_amount: service.price
        },
        quantity: 1
      }],
      mode: 'payment',
      // Send funds to connected account and collect platform fee
      payment_intent_data: {
        application_fee_amount: applicationFeeAmount,
        transfer_data: {
          destination: connectAccountId
        }
      },
      success_url: `${req.get('origin') || 'https://truthbyshaun-project.web.app'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.get('origin') || 'https://truthbyshaun-project.web.app'}/`,
      customer_email: customerEmail,
      metadata: {
        serviceId: serviceId,
        serviceName: service.name,
        customerName: customerName,
        customerEmail: customerEmail
      }
    });
    
    res.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Unable to create checkout session' });
  }
});

// Get Checkout Session
exports.getCheckoutSession = functions
  .runWith({ memory: '256MB', timeoutSeconds: 60 })
  .https.onRequest(async (req, res) => {
  // Enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(204).send('');
    return;
  }
  
  try {
    const sessionId = req.query.session_id;
    
    if (!sessionId) {
      res.status(400).json({ error: 'Session ID is required' });
      return;
    }
    
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    
    // Send confirmation email if payment was successful
    if (session.payment_status === 'paid') {
      try {
        // Email to customer
        await transporter.sendMail({
          from: functions.config().gmail.email,
          to: session.customer_email,
          subject: 'Payment Confirmation - Truth by Shaun',
          html: `
            <h2>Thank you for your purchase!</h2>
            <p>Hi ${session.metadata.customerName || 'there'},</p>
            <p>Your payment has been successfully processed.</p>
            <h3>Order Details:</h3>
            <ul>
              <li><strong>Service:</strong> ${session.metadata.serviceName}</li>
              <li><strong>Amount:</strong> £${(session.amount_total / 100).toFixed(2)}</li>
              <li><strong>Order ID:</strong> ${session.id}</li>
            </ul>
            <p>Shaun will contact you within 24 hours to schedule your session.</p>
            <p>Best regards,<br>Truth by Shaun Team</p>
          `
        });
        
        // Email to Shaun
        await transporter.sendMail({
          from: functions.config().gmail.email,
          to: functions.config().gmail.email,
          subject: 'New Order Received',
          html: `
            <h2>New Order Alert</h2>
            <h3>Order Details:</h3>
            <ul>
              <li><strong>Service:</strong> ${session.metadata.serviceName}</li>
              <li><strong>Amount:</strong> £${(session.amount_total / 100).toFixed(2)}</li>
              <li><strong>Customer:</strong> ${session.metadata.customerName}</li>
              <li><strong>Email:</strong> ${session.customer_email}</li>
              <li><strong>Order ID:</strong> ${session.id}</li>
            </ul>
            <p>Please contact the customer within 24 hours to schedule their session.</p>
          `
        });
      } catch (emailError) {
        console.error('Error sending emails:', emailError);
      }
    }
    
    res.json({
      success: true,
      order: {
        id: session.id,
        payment_status: session.payment_status,
        customerEmail: session.customer_email,
        amount: session.amount_total,
        currency: session.currency,
        serviceName: session.metadata.serviceName,
        customerName: session.metadata.customerName
      }
    });
  } catch (error) {
    console.error('Error retrieving checkout session:', error);
    res.status(500).json({ error: 'Unable to retrieve checkout session' });
  }
});

// Get All Orders
exports.getAllOrders = functions.https.onRequest(async (req, res) => {
  // Set CORS headers
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).send('');
    return;
  }

  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.line_items']
    });

    const orders = sessions.data.map(session => ({
      id: session.id,
      customerName: session.customer_details?.name || 'N/A',
      customerEmail: session.customer_details?.email || 'N/A',
      customerPhone: session.customer_details?.phone || 'N/A',
      serviceName: session.line_items?.data[0]?.description || 'N/A',
      amount: session.amount_total || 0,
      currency: session.currency || 'gbp',
      paymentStatus: session.payment_status,
      createdAt: new Date(session.created * 1000).toISOString()
    }));

    res.json({ success: true, orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});