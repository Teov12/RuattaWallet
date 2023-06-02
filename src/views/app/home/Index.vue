<script lang="ts" setup>
import { ref } from "vue";
import cryptoCard from './components/cryptoCard.vue';
import { useTransactions } from "../../../hooks/useTransactions"
import { onMounted } from '@vue/runtime-core';
import Loader from "../../../components/Loader.vue";

const { getAllTransactions } = useTransactions();
const isLoading = ref<boolean>(false);

onMounted(async () => {
  isLoading.value = true
  await getAllTransactions()
    .then(() => isLoading.value = false)
})

</script>

<template>
  <Loader msg="Cargando datos del usuario" v-if="isLoading" class-name="vh-100"></Loader>
  <div v-else>
    <h1>Home</h1>
    <h3 class="text-center">Criptomonedas disponibles para comprar y vender en nuestra exchange</h3>
    <div>
      <cryptoCard></cryptoCard>
    </div>
  </div>
</template>