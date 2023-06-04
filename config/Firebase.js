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
  authDomain: "wanted-8d9f1.firebaseapp.com",
  projectId: "wanted-8d9f1",
  storageBucket: "wanted-8d9f1.appspot.com",
  messagingSenderId: "854628704169",
  appId: "1:854628704169:web:4fc7df930c2b614a36eeb8",
  measurementId: "G-7SXQ6VF3YW"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const AUTH = getAuth(app);
const DATABASE = getFirestore(app);
const STORAGE = getStorage(app);
export default app
export {AUTH, DATABASE, STORAGE}

