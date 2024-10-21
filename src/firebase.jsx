// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB6iHK5_ZFfFGSJ8F2Sg80VpfkKBHcg7s4",
  authDomain: "mailhub-741e7.firebaseapp.com",
  projectId: "mailhub-741e7",
  storageBucket: "mailhub-741e7.appspot.com",
  messagingSenderId: "311036335615",
  appId: "1:311036335615:web:d0f5b4d1ac905d578e43ca",
  measurementId: "G-0MNC31H0G1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth;
export const db = getFirestore(app); // Initialize Cloud Firestore and get a reference to the service
export const provider = new GoogleAuthProvider();
