<script lang="ts" setup>

import { onMounted, ref, computed } from "vue";
import { useTransactions } from "../../../hooks/useTransactions";
import { useCryptos } from "../../../hooks/useCyptos";
import { useTransactionStore } from "../../../stores/transaction.store";
import Loader from "../../../components/Loader.vue";
import useCryptosStore from "../../../stores/cryptos.store";

const cryptoStore = useCryptosStore()

const isLoading = ref<boolean>(false);
const { getAllTransactions } = useTransactions();
const { getAllPrices } = useCryptos();

const store = useTransactionStore();
// TotalCount
const totalBTC = computed(() => {
  return store.totalBTC;
})

const totalETH = computed(() => {
  return store.totalETH;
})

const totalDAI = computed(() => {
  return store.totalDAI;
})


//TotalMoney
const dineroBTC = computed(() => {

  if (totalBTC.value != 0) {

    return (totalBTC.value * cryptoStore.getTotalBidPriceByValue("btc")).toFixed(2)
  }
  else return 0;

});

console.log(dineroBTC.value);

const dineroETH = computed(() => {
  if (totalETH.value != 0) {

    return (totalETH.value * cryptoStore.getTotalBidPriceByValue("eth")).toFixed(2);
  }
  else return 0;
});

const dineroDAI = computed(() => {
  if (totalDAI.value != 0) {
    return (totalDAI.value * cryptoStore.getTotalBidPriceByValue("dai")).toFixed(2)
  }
  else return 0

});

let sumaTotal = 0;

sumaTotal += parseFloat(dineroBTC.value || "0");
sumaTotal += parseFloat(dineroETH.value || "0");
sumaTotal += parseFloat(dineroDAI.value || "0");

const dineroTotal = computed(() =>
  sumaTotal.toFixed(2)
);


const salesBTC = computed(() => {
  return store.transactions.sBTC;
})
// const purchasesETH = store.transactions.pETH;
const salesETH = store.transactions.sETH;

// const purchasesDAI = store.transactions.pDAI;
 const salesDAI = store.transactions.sDAI;


// Calcula el costo total de compra de BTC, ETH y DAI
// const costBTC = computed(() => {

//   purchasesBTC.reduce((total, t) => total + parseFloat(t.money), 0);

// })
// const costETH = purchasesETH.reduce((total, t) => total + parseFloat(t.money), 0);
// const costDAI = purchasesDAI.reduce((total, t) => total + parseFloat(t.money), 0);

// Calcula el ingreso total por venta de BTC, ETH y DAI
const purCountBTC = computed(() => {
  return store.purBTC;
})

const purCountETH = computed(() => {
  return store.purETH;
})

const purCountDAI = computed(() => {
  return store.purDAI
})

const saleCountBTC = computed(() => {
  return store.saleBTC;
})

const saleCountETH = computed(() => {
  return store.saleETH;
})

const saleCountDAI = computed(() => {
  return store.saleDAI
})



const dineroPurBTC = computed(() => {
  return store.transactions.pBTC.reduce((total, t) => total + parseFloat(t.money), 0 || "0")
})

const dineroPurETH = computed(() => {
  return store.transactions.pETH.reduce((total, t) => total + parseFloat(t.money), 0 || "0")
})

const dineroPurDAI = computed(() => {
  return store.transactions.pDAI.reduce((total, t) => total + parseFloat(t.money), 0 || "0")
})


const incomeBTC = computed(() => {
  return (saleCountBTC.value * cryptoStore.getTotalBidPriceByValue("btc")).toFixed(2)
})
const incomeETH = computed(() => {
  return (saleCountETH.value * cryptoStore.getTotalBidPriceByValue("eth")).toFixed(2)
})
const incomeDAI = computed(() => {
  return (saleCountDAI.value * cryptoStore.getTotalBidPriceByValue("dai")).toFixed(2)
})

console.log(dineroPurBTC.value);
console.log(incomeBTC.value);
const salesBtc = ref<boolean>(false);
const salesEth = ref<boolean>(false);
const salesDai = ref<boolean>(false);

let resultNsBTC = 0;
let resultBTC = 0;
let resultNsETH = 0;
let resultETH = 0;
let resultNsDAI = 0;
let resultDAI = 0;
console.log(incomeBTC.value);
console.log(dineroPurBTC.value);
console.log(totalBTC.value);

if (salesBTC.value.length != 0) {
  salesBtc.value = true
  resultBTC = parseFloat(incomeBTC.value) - parseFloat(dineroPurBTC.value)
  console.log(resultBTC.toFixed(2));
}
else if (salesBTC.value.length == 0) {
  resultNsBTC = ((cryptoStore.getTotalBidPriceByValue("btc") * totalBTC.value)) - parseFloat(dineroPurBTC.value);
  console.log(resultNsBTC);
}

console.log(cryptoStore.getTotalBidPriceByValue("btc") * totalBTC.value);

if (salesETH.length != 0) {
  salesEth.value = true;
  resultETH = parseFloat(incomeETH.value) - parseFloat(dineroPurETH.value)

}
else if (salesETH.length == 0) {
  resultNsETH = ((cryptoStore.getTotalBidPriceByValue("eth") * totalETH.value) - parseFloat(dineroPurETH.value))
  console.log(resultNsETH);
}

if (salesDAI.length != 0) {
  salesDai.value = true;
  resultDAI = parseFloat(incomeDAI.value) - parseFloat(dineroPurDAI.value);
}
else if (salesDAI.length == 0) {
  resultNsDAI = ((cryptoStore.getTotalBidPriceByValue("dai") * totalDAI.value) - parseFloat(dineroPurDAI.value))
}


const invBTC = computed(() => {

  return resultBTC.toFixed(2)

})

const invBTCNs = computed(() => {

  return resultNsBTC.toFixed(2)
})

const invETH = computed(() => {

  return resultETH.toFixed(2)

})

const invETHNs = computed(() => {

  return resultNsETH.toFixed(2)
})

const invDAI = computed(() => {

return resultDAI.toFixed(2)

})

const invDAINs = computed(() => {

return resultNsDAI.toFixed(2)
})





console.log(invBTC.value);

console.log(invBTCNs.value);

onMounted(async () => {
  isLoading.value = true;
  await getAllTransactions()
    .then(async () => {
      isLoading.value = false
      await getAllPrices()
    })
})


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
            <td></td>
            <td>{{ dineroTotal }}</td>
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
            <td v-if="salesBtc">{{ invBTC }}</td>
            <td v-else>{{ invBTCNs }}</td>
          </tr>
          <tr>
            <td>ETH</td>
            <td v-if="salesEth">{{ invETH }}</td>
            <td v-else>{{ invETHNs }}</td>
          </tr>
          <tr>
            <td>DAI</td>
            <td v-if="salesDai">{{ invDAI }}</td>
            <td v-else>{{ invDAINs }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>