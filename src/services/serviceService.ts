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
  Timestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

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
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

const SERVICES_COLLECTION = 'services';

// Get all services
export const getAllServices = async (): Promise<Service[]> => {
  try {
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const q = query(servicesRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Get service by ID
export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const serviceRef = doc(db, SERVICES_COLLECTION, id);
    const serviceSnap = await getDoc(serviceRef);
    
    if (serviceSnap.exists()) {
      return {
        id: serviceSnap.id,
        ...serviceSnap.data()
      } as Service;
    }
    return null;
  } catch (error) {
    console.error('Error fetching service:', error);
    throw error;
  }
};

// Create new service
export const createService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  try {
    const servicesRef = collection(db, SERVICES_COLLECTION);
    const now = Timestamp.now();
    
    const docRef = await addDoc(servicesRef, {
      ...serviceData,
      createdAt: now,
      updatedAt: now
    });
    
    return docRef.id;
  } catch (error) {
    console.error('Error creating service:', error);
    throw error;
  }
};

// Update service
export const updateService = async (id: string, serviceData: Partial<Omit<Service, 'id' | 'createdAt'>>): Promise<void> => {
  try {
    const serviceRef = doc(db, SERVICES_COLLECTION, id);
    const now = Timestamp.now();
    
    await updateDoc(serviceRef, {
      ...serviceData,
      updatedAt: now
    });
  } catch (error) {
    console.error('Error updating service:', error);
    throw error;
  }
};

// Delete service
export const deleteService = async (id: string): Promise<void> => {
  try {
    const serviceRef = doc(db, SERVICES_COLLECTION, id);
    await deleteDoc(serviceRef);
  } catch (error) {
    console.error('Error deleting service:', error);
    throw error;
  }
};

// Get popular services
export const getPopularServices = async (): Promise<Service[]> => {
  try {
    const services = await getAllServices();
    return services.filter(service => service.isPopular);
  } catch (error) {
    console.error('Error fetching popular services:', error);
    throw error;
  }
};

// Seed initial services from the image
export const seedInitialServices = async (): Promise<void> => {
  try {
    const initialServices: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>[] = [
      {
        name: 'Phone Call',
        description: 'To discuss anything you like or that you need help with',
        pricing: [
          { duration: '30 minutes', price: 20 },
          { duration: '1 hour', price: 30 }
        ],
        features: ['One-on-one consultation', 'Flexible scheduling', 'Personal guidance'],
        isPopular: false
      },
      {
        name: 'FaceTime Mentorship',
        description: 'For 1-2-1 weight loss/toning training or a sit down chat',
        pricing: [
          { duration: '30 minutes', price: 25 },
          { duration: '1 hour', price: 35 }
        ],
        features: ['Video consultation', 'Weight loss guidance', 'Toning training', 'Personal chat'],
        isPopular: true
      },
      {
        name: 'THE MY TURN PLAN - 4 Week',
        description: 'Fat Loss / Training / Meal Plan',
        pricing: [
          { duration: '4 weeks', price: 149 }
        ],
        features: ['Comprehensive fat loss program', 'Custom training plan', 'Personalized meal plan', '4-week support'],
        isPopular: true
      },
      {
        name: 'THE MY TURN PLAN - 8 Week',
        description: 'Fat Loss / Training / Meal Plan',
        pricing: [
          { duration: '8 weeks', price: 199 }
        ],
        features: ['Extended fat loss program', 'Advanced training plan', 'Detailed meal plan', '8-week support'],
        isPopular: true
      }
    ];

    // Check if services already exist
    const existingServices = await getAllServices();
    if (existingServices.length === 0) {
      for (const service of initialServices) {
        await createService(service);
      }
      console.log('Initial services seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding initial services:', error);
    throw error;
  }
};