// Obtén las transacciones de compra y venta de BTC, ETH y DAI desde tu store
const purchasesBTC = transactionStore.transactions.pBTC;
const salesBTC = transactionStore.transactions.sBTC;

const purchasesETH = transactionStore.transactions.pETH;
const salesETH = transactionStore.transactions.sETH;

const purchasesDAI = transactionStore.transactions.pDAI;
const salesDAI = transactionStore.transactions.sDAI;

// Calcula la cantidad de BTC, ETH y DAI que tienes actualmente en tu wallet
const totalBTC = transactionStore.totalBTC;
const totalETH = transactionStore.totalETH;
const totalDAI = transactionStore.totalDAI;

// Calcula el costo total de compra de BTC, ETH y DAI
const costBTC = purchasesBTC.reduce((total, t) => total + parseFloat(t.money), 0);
const costETH = purchasesETH.reduce((total, t) => total + parseFloat(t.money), 0);
const costDAI = purchasesDAI.reduce((total, t) => total + parseFloat(t.money), 0);

// Calcula el ingreso total por venta de BTC, ETH y DAI
const incomeBTC = salesBTC.reduce((total, t) => total + parseFloat(t.money), 0);
const incomeETH = salesETH.reduce((total, t) => total + parseFloat(t.money), 0);
const incomeDAI = salesDAI.reduce((total, t) => total + parseFloat(t.money), 0);

// Calcula el resultado de tus inversiones en BTC, ETH y DAI
const resultBTC = totalBTC * (totalBTC > 0 ? totalBTC / costBTC : 0) + incomeBTC;
const resultETH = totalETH * (totalETH > 0 ? totalETH / costETH : 0) + incomeETH;
const resultDAI = totalDAI * (totalDAI > 0 ? totalDAI / costDAI : 0) + incomeDAI;

// Calcula la ganancia o pérdida total
const totalResult = resultBTC + resultETH + resultDAI - costBTC - costETH - costDAI;