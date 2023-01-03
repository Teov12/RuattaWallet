import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASEAPP_APIKEY,
  authDomain: import.meta.env.VITE_FIREBASEAPP_AUTHDOMAIN,
  projectId: import.meta.env.VITE_FIREBASEAPP_PROJECTID,
  storageBucket: import.meta.env.VITE_FIREBASEAPP_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASEAPP_MESSAGINGSENDERID,
  appId: import.meta.env.VITE_FIREBASEAPP_APPID,
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
