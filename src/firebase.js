import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBQGBHKYN8Gn7a7LTgb-QjPq1lGETv9Tqs",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "wealthflow-22aac.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "wealthflow-22aac",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "wealthflow-22aac.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1052230879048",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1052230879048:web:dce45962eca20a34a7157d",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-29RZPDZX3S",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const analyticsPromise = typeof window !== "undefined" && typeof window.document !== "undefined"
  ? isSupported().then((supported) => supported ? getAnalytics(firebaseApp) : null)
  : Promise.resolve(null);

export const auth = getAuth(firebaseApp);

export const signUpWithEmail = (email, password) =>
  createUserWithEmailAndPassword(auth, email, password);

export const signInWithEmail = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const signOutUser = () => signOut(auth);
