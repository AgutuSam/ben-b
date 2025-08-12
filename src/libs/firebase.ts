// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCr6nOxe2YXaO_2xChv1to_jpP8hv05jc",
  authDomain: "housetree-d9c62.firebaseapp.com",
  projectId: "housetree-d9c62",
  storageBucket: "housetree-d9c62.firebasestorage.app",
  messagingSenderId: "676613034070",
  appId: "1:676613034070:web:5b5cedb6d99433743fabf7",
  measurementId: "G-FYHT7EC2CP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app, analytics, firebaseConfig };
