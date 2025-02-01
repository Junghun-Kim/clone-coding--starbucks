// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmRgpQwUxuSG8UVpt-7eVwYe6CULDyggk",
  authDomain: "nwitter-reloaded-e6df9.firebaseapp.com",
  projectId: "nwitter-reloaded-e6df9",
  storageBucket: "nwitter-reloaded-e6df9.firebasestorage.app",
  messagingSenderId: "616127791716",
  appId: "1:616127791716:web:015ba2fdf193daf53ed571",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
export default auth;
