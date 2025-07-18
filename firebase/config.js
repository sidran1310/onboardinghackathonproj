// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkJxppSImTcM3JQY9_GwyPAP0AxukU7HY",
  authDomain: "onboarding-portal-df83e.firebaseapp.com",
  projectId: "onboarding-portal-df83e",
  storageBucket: "onboarding-portal-df83e.firebasestorage.app",
  messagingSenderId: "739838578778",
  appId: "1:739838578778:web:3c7023df77ecde606c0863"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
export default app;