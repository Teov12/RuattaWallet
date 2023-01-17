import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
  signOut
} from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { auth } from "../services/firebase.service";
import authStore from "../stores/auth.store";
import { useAuth } from "@vueuse/firebase";
import { useSweetAlert } from "./useSweetAlert";
import { ref } from "vue";

const {toastSuccess, swalConfirmDialog} = useSweetAlert();
const isLoading = ref<boolean>(false);

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
      .catch((e) => {
        if (e.code == "auth/wrong-password") {
          alert("Contraseña incorrecta")
        }
        else if(e.code == "auth/user-not-found"){
          alert("Usuario no encontrado")
        }
      });
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

  //Metodo para iniciar sesion con google
  async function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((e) => console.log(e))
      .finally(() => (isLoading.value = false));
  }

  //Metodo para desloguear
  async function logOut() {
    swalConfirmDialog(
      "¿Seguro que quiere salir?",
      "Si, salir!",
      "No",
      async() => {
        await signOut(auth)
          .then(() => {router.push({path: "/login"});
        });
      }
    );
  }

  function setUser(user: User) {
    Swal.fire({
      title: "Bienvenido",
      color: '#3085d6',
      icon: "success",
      text: "Compre y venda de forma segura!"
    })
    .then(() => {
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
    logOut,
    user,
  };
}
