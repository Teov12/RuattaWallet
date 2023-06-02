// import { useTransactions } from "../hooks/useTransactions";
// import { useTransactionStore } from "../stores/transaction.store";
// import { onBeforeMount, computed } from "vue";

// const { getAllTransactions } = useTransactions()

// const { transactions } = useTransactionStore()

// const transactionsBTC = computed(() => transactions.pBTC) 
// const transactionsETH = computed(() => transactions.pETH)
// const transactionsDAI = computed(() => transactions.pDAI)

// let cryptoTotalsBTC = 0;
// let cryptoTotalsETH = 0;

// transactionsBTC.value.forEach(transaction => {
//   const cryptoAmount = transaction.crypto_amount;
//   cryptoTotalsBTC = cryptoTotalsBTC + cryptoAmount;
// })

// const getPETHAMOUNT  = () => transactionsETH.value.forEach(transaction => {
//   const cryptoAmount = transaction.crypto_amount;
//   cryptoTotalsETH = cryptoTotalsETH + cryptoAmount;

// })