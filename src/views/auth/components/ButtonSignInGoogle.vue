<script lang="ts" setup>

import { useFirebase } from "../../../hooks/useFirebase";
import { ref } from "vue";

const { signInWithGoogle } = useFirebase();

const isLoading = ref<boolean>(false)
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
