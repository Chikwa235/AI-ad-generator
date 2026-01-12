import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDwcDRaT3LKm4E97cR985IUHNK6kHcZHMI",
    authDomain: "apps-e02e4.firebaseapp.com",
    projectId: "apps-e02e4",
    storageBucket: "apps-e02e4.appspot.com",
    messagingSenderId: "931728242416",
    appId: "1:931728242416:web:1450a322782504ce293435",
    measurementId: "G-D9J6T82264"
};

// ✅ Prevent multiple Firebase app instances
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
