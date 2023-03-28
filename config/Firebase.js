// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {VITE_GOOGLE_API_KEY} from '@env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: VITE_GOOGLE_API_KEY,
  authDomain: "anointed-hands-wigs.firebaseapp.com",
  projectId: "anointed-hands-wigs",
  storageBucket: "anointed-hands-wigs.appspot.com",
  messagingSenderId: "309907460540",
  appId: "1:309907460540:web:0ec68c85b52ec9c1b85bb9",
  measurementId: "G-T5CT9PFF4R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);
const DATABASE = getFirestore(app);
const STORAGE = getStorage(app);
export default app
export {AUTH, DATABASE, STORAGE}
