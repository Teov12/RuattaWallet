<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { useTransactions } from "../../../hooks/useTransactions";
import { useCryptos } from "../../../hooks/useCyptos";
import { useTransactionStore } from "../../../stores/transaction.store";
import Loader from "../../../components/Loader.vue";
import useCryptosStore from "../../../stores/cryptos.store";

const cryptoStore = useCryptosStore();

const isLoading = ref<boolean>(false);
const { getAllTransactions } = useTransactions();
const { getAllPrices } = useCryptos();

const store = useTransactionStore();
// TotalCount
const totalBTC = computed(() => {
  return store.totalBTC;
});

const totalETH = computed(() => {
  return store.totalETH;
});

const totalDAI = computed(() => {
  return store.totalDAI;
});

//TotalMoney
const dineroBTC = computed(() => {
  if (totalBTC.value != 0) {
    return (totalBTC.value * cryptoStore.getTotalBidPriceByValue("btc")).toFixed(2);
  } else return 0;
});

const dineroETH = computed(() => {
  if (totalETH.value != 0) {
    return (totalETH.value * cryptoStore.getTotalBidPriceByValue("eth")).toFixed(2);
  } else return 0;
});

const dineroDAI = computed(() => {
  if (totalDAI.value != 0) {
    return (totalDAI.value * cryptoStore.getTotalBidPriceByValue("dai")).toFixed(2);
  } else return 0;
});

const sumaTotal = computed(() => {
  return (parseFloat(dineroBTC.value || "0") + parseFloat(dineroETH.value || "0") + parseFloat(dineroDAI.value || "0")).toFixed(2);
});

const salesBTC = computed(() => {
  return store.transactions.sBTC;
});

const salesETH = computed(() => {
  return store.transactions.sETH;
});

const salesDAI = computed(() => {
  return store.transactions.sDAI;
});

const saleCountBTC = computed(() => {
  return store.saleBTC;
});

const saleCountETH = computed(() => {
  return store.saleETH;
});

const saleCountDAI = computed(() => {
  return store.saleDAI;
});

const dineroPurBTC = computed(() => {
  return store.transactions.pBTC.reduce((total, t) => total + t.money, 0 || "0");
});

const dineroPurETH = computed(() => {
  return store.transactions.pETH.reduce((total, t) => total + t.money, 0 || "0");
});

const dineroPurDAI = computed(() => {
  return store.transactions.pDAI.reduce((total, t) => total + t.money, 0 || "0");
});

const incomeBTC = computed(() => {
  return (saleCountBTC.value * cryptoStore.getTotalBidPriceByValue("btc")).toFixed(2);
});
const incomeETH = computed(() => {
  return (saleCountETH.value * cryptoStore.getTotalBidPriceByValue("eth")).toFixed(2);
});
const incomeDAI = computed(() => {
  return (saleCountDAI.value * cryptoStore.getTotalBidPriceByValue("dai")).toFixed(2);
});

const salesBtc = ref<boolean>(false);
const salesEth = ref<boolean>(false);
const salesDai = ref<boolean>(false);

const resultBTC = computed(() => {
  if (salesBTC.value.length != 0) {
    salesBtc.value = true;
    return (parseFloat(incomeBTC.value) - parseFloat(dineroPurBTC.value)).toFixed(2);
  } else if (salesBTC.value.length == 0) {
    return (cryptoStore.getTotalBidPriceByValue("btc") * totalBTC.value - parseFloat(dineroPurBTC.value)).toFixed(2);
  }
});

console.log(cryptoStore.getTotalBidPriceByValue("btc"));
console.log(cryptoStore.getTotalBidPriceByValue("btc") * totalBTC.value);
console.log(dineroPurBTC.value);

const resultETH = computed(() => {
  if (salesETH.value.length != 0) {
    salesEth.value = true;
    return (parseFloat(incomeETH.value) - parseFloat(dineroPurETH.value)).toFixed(2);
  } else if (salesETH.value.length == 0) {
    return (cryptoStore.getTotalBidPriceByValue("eth") * totalETH.value - parseFloat(dineroPurETH.value)).toFixed(2);
  }
});

const resultDAI = computed(() => {
  if (salesDAI.value.length != 0) {
    salesDai.value = true;
    return (parseFloat(incomeDAI.value) - parseFloat(dineroPurDAI.value)).toFixed(2);
  } else if (salesDAI.value.length == 0) {
    return(cryptoStore.getTotalBidPriceByValue("dai") * totalDAI.value - parseFloat(dineroPurDAI.value)).toFixed(2);
  }
});

onMounted(async () => {
  isLoading.value = true;
  await getAllTransactions().then(async () => {
    isLoading.value = false;
    await getAllPrices();
  });
});
</script>

<template>
  <Loader msg="Cargando billetera" v-if="isLoading" class-name="vh-100" />
  <div v-else>
    <h2>Mi Portafolio</h2>
    <div class="container justify-content-start align-content-center m-10 py-5 shadow-sm">
      <table class="table table-row-dashed table-row-gray-300 gy-7">
        <thead>
          <tr class="fw-bolder fs-5 text-gray-800">
            <th>Criptomoneda</th>
            <th>Cantidad</th>
            <th>Dinero</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BTC</td>
            <td>{{ totalBTC }}</td>
            <td>{{ dineroBTC }}</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>{{ totalETH }}</td>
            <td>{{ dineroETH }}</td>
          </tr>
          <tr>
            <td>DAI</td>
            <td>{{ totalDAI }}</td>
            <td>{{ dineroDAI }}</td>
          </tr>
          <tr>
            <td>TOTAL</td>
            <td>-</td>
            <td>{{ sumaTotal }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2 class="col">Analisis de inversion</h2>
    <div class="container justify-content-start align-content-center m-10 py-5 shadow-sm">
      <table class="table table-row-dashed table-row-gray-300 gy-7 col">
        <thead>
          <tr class="fw-bolder fs-5 text-gray-800">
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BTC</td>
            <td>{{ resultBTC }}</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td>{{ resultETH }}</td>
          </tr>
          <tr>
            <td>DAI</td>
            <td>{{ resultDAI }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
