// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBimT92vwFHAZpOSmZY3FYWgK9TuwJTEec",
  authDomain: "myfb-229fa.firebaseapp.com",
  projectId: "myfb-229fa",
  storageBucket: "myfb-229fa.appspot.com",
  messagingSenderId: "113278327343",
  appId: "1:113278327343:web:1bb98ec739f826ecccc4da"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth;