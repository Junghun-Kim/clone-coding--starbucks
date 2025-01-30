// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-F-jrkSL_OTQ1-3JvN0L73OhNXBI1cpg",
  authDomain: "nwitter-reloaded-dfb8e.firebaseapp.com",
  projectId: "nwitter-reloaded-dfb8e",
  storageBucket: "nwitter-reloaded-dfb8e.firebasestorage.app",
  messagingSenderId: "30210628850",
  appId: "1:30210628850:web:4ff71c25dd50fdc238c46b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);