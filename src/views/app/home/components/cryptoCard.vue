<script lang="ts" setup>
import useCryptoStore from "../../../../stores/cryptos.store"

const cryptoStore = useCryptoStore();
let id = 0;
</script>

<template>
  <div class="item-center align-items-center justify-content-center">
    <table class="responsive-table table table-striped">
      <thead>
        <tr class="fs-2 fw-bolder">
          <th scope="col">#</th>
          <th scope="col">Nombre</th>
          <th scope="col">Precio/ARS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="crypto, id in cryptoStore.cryptos" :key="id">
          <th scope="row">{{ id }}</th>
          <td>
            <img
              :src="`/media/cryptos/${crypto.value}.png`"
              class="h-25px mb-2 me-1"
              :alt="`${crypto.value}`"
            >
            <strong>{{ crypto.name }}</strong>
            {{ crypto.value.toUpperCase() }}
          </td>
          <td>$ {{crypto.prices.ask}}</td>
        </tr>
      </tbody>
    </table>
  </div>














  <!-- <ul class="list-group list-group-flush">
    
    <li v-for="crypto in cryptoStore.cryptos" :key="crypto.value" class="list-group-item">
      <img 
        :src="`/media/cryptos/${crypto.value}.png`"
        class="h-50px mb-5"
        :alt="`${crypto.name}`"
      >
      Nombre {{ crypto.name }}
      Precio {{ crypto.prices.ask }}
      {{ crypto.value }} 
    </li>
  </ul> -->
</template>