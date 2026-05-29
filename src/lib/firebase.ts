// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAW11z__QFeuFBldKV0FUf3uLq2uayZAco",
  authDomain: "zenzlearn.firebaseapp.com",
  projectId: "zenzlearn",
  storageBucket: "zenzlearn.firebasestorage.app",
  messagingSenderId: "52132947108",
  appId: "1:52132947108:web:153423ac24d7d7b2dab231",
  measurementId: "G-J4LPZEX0HL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export auth for Phone Authentication
export const auth = getAuth(app);

auth.useDeviceLanguage();