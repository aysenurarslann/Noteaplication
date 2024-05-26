import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA5lypCNXvKbpT6OLMYYMEc7P09tvxrSQU",
    authDomain: "noteapp-669de.firebaseapp.com",
    projectId: "noteapp-669de",
    storageBucket: "noteapp-669de.appspot.com",
    messagingSenderId: "143347438131",
    appId: "1:143347438131:web:f57a9c0c74c1a9d8434946",
    measurementId: "G-EPR3TD5HH3"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore };
