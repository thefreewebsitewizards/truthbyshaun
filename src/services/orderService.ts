import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy, 
  where, 
  Timestamp,
  DocumentData
} from 'firebase/firestore';
import { db } from '../config/firebase';

export interface Order {
  id?: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  amount: number;
  notes?: string;
  createdAt: string | Timestamp;
  updatedAt?: string | Timestamp;
}

const ORDERS_COLLECTION = 'truthbyshaun_orders';

// Get all orders
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(ordersRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      orders.push({
        id: doc.id,
        customerName: data.customerName || '',
        email: data.customerEmail || '',
        phone: data.phone || '',
        service: data.serviceName || '',
        date: data.date || '',
        time: data.time || '',
        status: data.paymentStatus === 'paid' ? 'completed' : 'pending',
        amount: data.amount ? (data.amount > 1000 ? data.amount / 100 : data.amount) : 0,
        notes: data.notes || '',
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw new Error('Failed to fetch orders');
  }
};

// Get order by ID
export const getOrderById = async (orderId: string): Promise<Order | null> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      const data = orderSnap.data() as DocumentData;
      return {
        id: orderSnap.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
      } as Order;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw new Error('Failed to fetch order');
  }
};

// Create new order
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const newOrder = {
      ...orderData,
      // Ensure amount is in pounds (convert from pence if needed)
      amount: orderData.amount > 1000 ? orderData.amount / 100 : orderData.amount,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now()
    };
    
    const docRef = await addDoc(ordersRef, newOrder);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
};

// Create order from Stripe session data
export const createOrderFromStripe = async (sessionData: {
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  serviceName: string;
  amount: number; // in pence
  paymentStatus: string;
  sessionId: string;
  notes?: string;
}): Promise<string> => {
  try {
    const orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'> = {
      customerName: sessionData.customerName,
      email: sessionData.customerEmail,
      phone: sessionData.customerPhone || '',
      service: sessionData.serviceName,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
      status: sessionData.paymentStatus === 'paid' ? 'completed' : 'pending',
      amount: sessionData.amount / 100, // Convert pence to pounds
      notes: sessionData.notes || ''
    };
    
    return await createOrder(orderData);
  } catch (error) {
    console.error('Error creating order from Stripe:', error);
    throw new Error('Failed to create order from Stripe data');
  }
};

// Update order
export const updateOrder = async (orderId: string, updateData: Partial<Omit<Order, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    const updatedData = {
      ...updateData,
      updatedAt: Timestamp.now()
    };
    
    await updateDoc(orderRef, updatedData);
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }
};

// Delete order
export const deleteOrder = async (orderId: string): Promise<void> => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId);
    await deleteDoc(orderRef);
  } catch (error) {
    console.error('Error deleting order:', error);
    throw new Error('Failed to delete order');
  }
};

// Get orders by status
export const getOrdersByStatus = async (status: Order['status']): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION);
    const q = query(
      ordersRef, 
      where('status', '==', status),
      orderBy('createdAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    
    const orders: Order[] = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data() as DocumentData;
      orders.push({
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt
      } as Order);
    });
    
    return orders;
  } catch (error) {
    console.error('Error fetching orders by status:', error);
    throw new Error('Failed to fetch orders by status');
  }
};

// Get orders statistics
export const getOrdersStats = async () => {
  try {
    const orders = await getAllOrders();
    
    const stats = {
      total: orders.length,
      pending: orders.filter(order => order.status === 'pending').length,
      confirmed: orders.filter(order => order.status === 'confirmed').length,
      completed: orders.filter(order => order.status === 'completed').length,
      cancelled: orders.filter(order => order.status === 'cancelled').length,
      totalRevenue: orders
        .filter(order => order.status === 'completed')
        .reduce((sum, order) => sum + order.amount, 0),
      thisMonth: orders.filter(order => {
        let orderDate: Date;
        if (typeof order.createdAt === 'string') {
          orderDate = new Date(order.createdAt);
        } else {
          orderDate = order.createdAt.toDate();
        }
        const now = new Date();
        return orderDate.getMonth() === now.getMonth() && 
               orderDate.getFullYear() === now.getFullYear();
      }).length
    };
    
    return stats;
  } catch (error) {
    console.error('Error fetching orders stats:', error);
    throw new Error('Failed to fetch orders statistics');
  }
};