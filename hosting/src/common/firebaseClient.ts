import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: "AIzaSyCl07KLKw5bbuclY_hMkc4FJfhtmyLJWks",
      authDomain: "thinking-generator.stin.ink",
      databaseURL: "https://thinking-generator.firebaseio.com",
      projectId: "thinking-generator",
      storageBucket: "thinking-generator.appspot.com",
      messagingSenderId: "376700794190",
      appId: "1:376700794190:web:d7986b74dfb2d1d9da1a1f",
      measurementId: "G-GPRLZB4B9P",
    })
  : firebase.app();

firebase.auth();

export { firebase };
export const firebaseAuth = app.auth();
export const firestore = app.firestore();
export const firebaseStorage = app.storage();

firebaseAuth.useDeviceLanguage();
