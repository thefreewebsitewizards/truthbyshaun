export interface Service {
  id?: string;
  name: string;
  description: string;
  pricing: {
    duration: string;
    price: number;
  }[];
  features?: string[];
  isPopular?: boolean;
  createdAt?: any;
  updatedAt?: any;
  // Legacy fields for backward compatibility
  title?: string;
  price?: string;
  icon?: string;
  duration?: string;
  popular?: boolean;
}

export interface ServiceConfig {
  [key: string]: Service;
}

export interface CheckoutSessionRequest {
  serviceId: string;
  customerName: string;
  customerEmail: string;
}

export interface CheckoutSessionResponse {
  url?: string;
  error?: string;
}

export interface OrderDetails {
  serviceName: string;
  amount: number;
  customerName?: string;
  customerEmail: string;
}

export interface SuccessModalData {
  orderDetails: OrderDetails;
}

export interface BookingFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}