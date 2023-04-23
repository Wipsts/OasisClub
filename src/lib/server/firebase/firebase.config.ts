// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBHNuX_GHTvpcT51FgqfAgiAy41KEo00qw",
  authDomain: "oasis-club-42a44.firebaseapp.com",
  projectId: "oasis-club-42a44",
  storageBucket: "oasis-club-42a44.appspot.com",
  messagingSenderId: "282695575042",
  appId: "1:282695575042:web:896f02c08d22f006d2a91b",
  measurementId: "G-ESTQR6KJLZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);