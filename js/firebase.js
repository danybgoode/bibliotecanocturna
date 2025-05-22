// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwsCEXZ61tO3l8L3NQHAP9IgI07nRTNmA",
  authDomain: "bibliotecanocturnaauth.firebaseapp.com",
  projectId: "bibliotecanocturnaauth",
  storageBucket: "bibliotecanocturnaauth.firebasestorage.app",
  messagingSenderId: "627241133847",
  appId: "1:627241133847:web:27f2b56650fe72457f7952",
  measurementId: "G-9NPSSS6GDP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Example: Sign up with email
async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("Signed up:", userCredential.user);
  } catch (error) {
    console.error("Signup error", error);
  }
}

// Google Sign-In
async function googleSignIn() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("Google signed in:", result.user);
  } catch (error) {
    console.error("Google sign-in error", error);
  }
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is logged in:", user);
    window.location.href = "https://listen.bibliotecanocturna.com.mx/login";
  } else {
    console.log("No user logged in");
  }
});