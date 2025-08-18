const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.secret_key);
const nodemailer = require('nodemailer');

admin.initializeApp();

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
    const developerFeePercent = 0.20; // 20%
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
      success_url: `${req.get('origin') || 'https://truthbyshaun-project.web.app'}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.get('origin') || 'https://truthbyshaun-project.web.app'}/index.html`,
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
exports.getAllOrders = functions
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
    // Retrieve recent checkout sessions
    const sessions = await stripe.checkout.sessions.list({
      limit: 100
    });
    
    const orders = sessions.data.map(session => ({
      id: session.id,
      amount: session.amount_total,
      currency: session.currency,
      status: session.payment_status,
      created: session.created,
      customer_email: session.customer_email,
      serviceName: session.metadata.serviceName,
      customerName: session.metadata.customerName
    }));
    
    res.json({ orders });
  } catch (error) {
    console.error('Error retrieving orders:', error);
    res.status(500).json({ error: 'Unable to retrieve orders' });
  }
});