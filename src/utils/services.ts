// This file now only contains checkout functionality
// Services are managed through Firestore in serviceService.ts

// Stripe checkout session creation
export interface CheckoutSessionData {
  serviceId: string;
  customerEmail: string;
  customerName: string;
  customerPhone?: string;
  message?: string;
}

export const createCheckoutSession = async (data: CheckoutSessionData): Promise<{ url: string }> => {
  try {
    const response = await fetch('https://us-central1-truthbyshaun-project.cloudfunctions.net/createCheckoutSession', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        serviceId: data.serviceId,
        customerEmail: data.customerEmail,
        customerName: data.customerName,
        customerPhone: data.customerPhone || '',
        message: data.message || ''
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.url) {
      return { url: result.url };
    } else {
      throw new Error(result.error || 'Failed to create checkout session');
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw new Error('Failed to create checkout session');
  }
};