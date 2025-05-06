import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  
  apiKey: "AIzaSyDIhZnkNk8THJOsSnoG5KvTlJ2qe_PXLac",
  authDomain: "doc-clone-367a3.firebaseapp.com",
  projectId: "doc-clone-367a3",
  storageBucket: "doc-clone-367a3.firebasestorage.app",
  messagingSenderId: "546617112050",
  appId: "1:546617112050:web:8bde09a7e41dd1121ae76b",
  measurementId: "G-BM8Y6LZ3K9"

};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app)