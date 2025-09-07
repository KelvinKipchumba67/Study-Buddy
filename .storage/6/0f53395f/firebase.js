import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration (replace with your actual config)
const firebaseConfig = {
  apiKey: "demo-api-key",
  authDomain: "ai-study-buddy-demo.firebaseapp.com",
  projectId: "ai-study-buddy-demo",
  storageBucket: "ai-study-buddy-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef123456"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;