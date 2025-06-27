// frontend/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Your Firebase config (this is correct)
const firebaseConfig = {
  apiKey: "AIzaSyCnGlqVp5ed4Y1mhiplzIfHETG3AZJPaSI",
  authDomain: "abaya-project.firebaseapp.com",
  projectId: "abaya-project",
  storageBucket: "abaya-project.appspot.com", // ✅ correct this line
  messagingSenderId: "237304900508",
  appId: "1:237304900508:web:e76896b2ba127668b47659",
  measurementId: "G-SNCBBQPXP4"
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize Auth
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
