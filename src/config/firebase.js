// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2DvpwyrYhWUk710AVu0qa_i2XyvZcyPE",
  authDomain: "ice-stupa-a4cdb.firebaseapp.com",
  projectId: "ice-stupa-a4cdb",
  storageBucket: "ice-stupa-a4cdb.firebasestorage.app",
  messagingSenderId: "931412618094",
  appId: "1:931412618094:web:e4cffe018b43e98d7e2f7f",
  measurementId: "G-4MW7Y8LPV7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);