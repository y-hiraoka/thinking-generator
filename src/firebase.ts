import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage"

firebase.initializeApp({
  apiKey: "AIzaSyCl07KLKw5bbuclY_hMkc4FJfhtmyLJWks",
  authDomain: "thinking-generator.firebaseapp.com",
  databaseURL: "https://thinking-generator.firebaseio.com",
  projectId: "thinking-generator",
  storageBucket: "thinking-generator.appspot.com",
  messagingSenderId: "376700794190",
  appId: "1:376700794190:web:d7986b74dfb2d1d9da1a1f",
  measurementId: "G-GPRLZB4B9P"
});

export default firebase;