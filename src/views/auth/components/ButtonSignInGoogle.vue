<script lang="ts" setup>
import { useFirebase } from "../../../hooks/useFirebase";

const { signInWithGoogle } = useFirebase();
</script>

<template>
  <button type="button" class="btn btn-google w-100" @click="signInWithGoogle">
    Continuar con Google
  </button>
</template>
