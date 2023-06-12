import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

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
const db = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app);
const auth = getAuth(app);
export {analytics, db, auth, storage}