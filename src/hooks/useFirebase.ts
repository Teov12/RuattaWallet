import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { auth } from "../services/firebase.service";
import authStore from "../stores/auth.store";
import { useAuth } from "@vueuse/firebase";

export function useFirebase() {
  const store = authStore();
  const router = useRouter();

  //  Este metodo lo usamos para ver si hay un usuario activo
  async function currentUser() {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userCredential) => resolve(userCredential),
        (e) => reject(e)
      );
      unsubscribe();
    });
  }

  //  Metodo para iniciar sesion
  async function login(email: string, password: string) {
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((e) => console.log(e));
  }

  //  Metodo para registrar usuario
  async function register(email: string, password: string) {
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((e) => {
        if (e.code == "auth/email-already-in-use") {
          alert("Email ya en uso")
        }
      
      });
  }

  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((e) => console.log(e));
  }

  async function logOut() {
    
  }

  function setUser(user: User) {
    Swal.fire("Bienvienido", "", "success").then(() => {
      router.push({ path: "/home" });
    });
    store.setUser(user);
  }

  const {user} = useAuth(auth)

  return {
    currentUser,
    login,
    register,
    signInWithGoogle,
    user
  };
}
