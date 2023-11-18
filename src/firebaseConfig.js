import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyB3p1Ragyrzxc4GRn32zcrcVFzubmB0fBc",
  authDomain: "gatheel.firebaseapp.com",
  projectId: "gatheel",
  storageBucket: "gatheel.appspot.com",
  messagingSenderId: "758672717693",
  appId: "1:758672717693:web:119aecf37995a52449fe14"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);