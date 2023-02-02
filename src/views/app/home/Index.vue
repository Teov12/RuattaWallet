<script lang="ts" setup>
import cryptoCard from './components/cryptoCard.vue';
import {useTransactions} from "../../../hooks/useTransactions"
import { onMounted } from '@vue/runtime-core';

const {getAllTransactions} = useTransactions();

onMounted(() => {
  getAllTransactions()
})

</script>

<template>
  <h1>Home</h1>
  <h3 class="text-center">Criptomonedas disponibles para comprar y vender en nuestra exchange</h3>
  <div>
    <cryptoCard></cryptoCard>
  </div>
</template>