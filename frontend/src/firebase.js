// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA0_NN3cJ1RFVlyV5uLuCTEpOSIqiQkOd4",
    authDomain: "career-counsleling.firebaseapp.com",
    projectId: "career-counsleling",
    appId: "YOUR_APP_ID",
    // Optional: add storageBucket, messagingSenderId
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth, googleProvider, githubProvider, signInWithPopup };
