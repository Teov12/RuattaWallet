import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {

  apiKey: "AIzaSyBbTOvY_NB8w-0w8b66xyrXaoOp6_cs2-c",
  authDomain: "vue-3-2022tpwallet.firebaseapp.com",
  projectId: "vue-3-2022tpwallet",
  storageBucket: "vue-3-2022tpwallet.appspot.com",
  messagingSenderId: "514507881088",
  appId: "1:514507881088:web:5f596d965e6ffb2b680465"
}

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
