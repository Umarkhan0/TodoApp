import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , createUserWithEmailAndPassword , signOut , signInWithEmailAndPassword , onAuthStateChanged} from "firebase/auth";
import { getFirestore , collection, addDoc , orderBy ,  serverTimestamp , updateDoc , deleteDoc , doc , setDoc , where , query , onSnapshot } from "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyB2OMz4372W0Oog9Ald4ZXwSF_Yrv6wscI",
    authDomain: "todolist-6bc50.firebaseapp.com",
    projectId: "todolist-6bc50",
    storageBucket: "todolist-6bc50.appspot.com",
    messagingSenderId: "644049841206",
    appId: "1:644049841206:web:b7f115a751a47e1d28bc97",
    measurementId: "G-1RF6PE5W53"
  };
  const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth , createUserWithEmailAndPassword , orderBy , signOut ,  serverTimestamp, doc , onSnapshot , deleteDoc , query, where ,db , collection, addDoc , updateDoc , setDoc , signInWithEmailAndPassword , onAuthStateChanged}