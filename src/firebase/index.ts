import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBBgm73ewEz6S4cFpvSTyPKYF_GnVqFj5I",
  authDomain: "web-comments-generator.firebaseapp.com",
  projectId: "web-comments-generator",
  storageBucket: "web-comments-generator.appspot.com",
  messagingSenderId: "666553344072",
  appId: "1:666553344072:web:5e0c713bd31dfd2d8df87d",
  measurementId: "G-P14V81WVG8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
