import { initializeApp } from "firebase/app";
import {getFirestore, collection} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCPYFcO9WvPh5TtOPHovgsM8g2YBHOAb2s",
  authDomain: "satwickreview.firebaseapp.com",
  projectId: "satwickreview",
  storageBucket: "satwickreview.appspot.com",
  messagingSenderId: "273828080376",
  appId: "1:273828080376:web:c5893f2cadd10e9087e90d"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const moviesRef = collection(db, "movies");
export const reviewsRef = collection(db, "reviews");
export const usersRef = collection(db, "users");

export default app;