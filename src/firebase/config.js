// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiCNqmBaQsApXA2AaAFwLyg_ZyBm_tG8o",
  authDomain: "twitter-clone-cc08f.firebaseapp.com",
  projectId: "twitter-clone-cc08f",
  storageBucket: "twitter-clone-cc08f.appspot.com",
  messagingSenderId: "194993393742",
  appId: "1:194993393742:web:f1ec61c1e0ab7f62a0f31f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//? auth referansı alma
export const auth = getAuth(app);

//? provider referansı alma
export const provider = new GoogleAuthProvider();

//? firestore referans alma
export const db = getFirestore(app);

//? storage referansı alma
export const storage = getStorage(app);
