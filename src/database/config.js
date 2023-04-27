import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDgIN-b8v4aq5tRdDvHdVibyPw0WvAO81k",
  authDomain: "voting-app-74856.firebaseapp.com",
  projectId: "voting-app-74856",
  storageBucket: "voting-app-74856.appspot.com",
  messagingSenderId: "441163329981",
  appId: "1:441163329981:web:831154ff3d0f435a5ce2d4",
  measurementId: "G-E196FKRMEM",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { Firebase, app, db, collection, addDoc, getDocs, doc, updateDoc };
