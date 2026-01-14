import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCLBMNEDGHyToxh_dVVF-9vjBKYUHiLuJw",
  authDomain: "kobby23-dcbc6.firebaseapp.com",
  projectId: "kobby23-dcbc6",
  storageBucket: "kobby23-dcbc6.firebasestorage.app",
  messagingSenderId: "1046888507980",
  appId: "1:1046888507980:web:26ad767cc027eeb411a2e9",
  measurementId: "G-E2QMGB15X6"
};

// ✅ Prevent multiple Firebase app instances
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
