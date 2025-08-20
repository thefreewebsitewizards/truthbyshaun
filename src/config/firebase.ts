import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDvaHjJ1-lrN4TxGVa8Eb-jHVySZlHoGm4",
  authDomain: "truthbyshaun-project.firebaseapp.com",
  projectId: "truthbyshaun-project",
  storageBucket: "truthbyshaun-project.firebasestorage.app",
  messagingSenderId: "91172277254",
  appId: "1:91172277254:web:1967b6a1b24865ac000787"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);

export default app;