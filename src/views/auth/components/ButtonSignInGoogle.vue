<script lang="ts" setup>

import { useFirebase} from "../../../hooks/useFirebase";
import {GoogleAuthProvider, signInWithPopup,} from "firebase/auth";
import { auth } from "../../../services/firebase.service"
import { ref } from "vue";

const {setUser, user} = useFirebase()
const isLoading = ref<boolean>(false)

async function signInWithGoogle() {
  isLoading.value = true;
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider)
    .then((userCredential) => {
      setUser(userCredential.user);
    })
    .catch((e) => console.log(e))
    .finally(() => (isLoading.value = false));
  }

</script>

<template>
  <button type="button" class="btn btn-google w-100" @click="signInWithGoogle">
    <i class="fa-brands fa-google"></i>
    Continuar con Google
    <span
      class="spinner-border spinner-border-sm align-middle ms-2"
      v-if="isLoading"
    ></span>
  </button>
</template>
