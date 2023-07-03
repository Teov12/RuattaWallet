import { defineStore } from "pinia";
import { computed, ref } from "vue"
import { ITransaction } from "../interfaces/ITransaction"

interface WalletState {
    loading: boolean,
    transactions: {
        purchases: ITransaction[],
        pBTC: ITransaction[],
        pETH: ITransaction[],
        pDAI: ITransaction[],
        sales: ITransaction[],
        sBTC: ITransaction[],
        sETH: ITransaction[],
        sDAI: ITransaction[]
    },
    transaction: ITransaction,
}




export const useTransactionStore = defineStore("transaction", {
    state: (): WalletState => ({
        loading: true,
        transactions: {
            purchases: [],
            pBTC: [],
            pETH: [],
            pDAI: [],
            sales: [],
            sBTC: [],
            sETH: [],
            sDAI: [],

        },
        transaction: {
            _id: '',
            user_id: '',
            action: '',
            crypto_code: '',
            crypto_amount: '',
            money: '',
            datetime: ''
        },


    }),

    getters: {

        purBTC: (state) => {
            return state.transactions.pBTC.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)
        },
        purETH: (state) => {
            return state.transactions.pETH.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)
        },
        purDAI: (state) => {
            return state.transactions.pDAI.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)
        },
        saleBTC: (state) => {
            return state.transactions.sBTC.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)
        },
        saleETH: (state) => {
            return state.transactions.sETH.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)
        },
        saleDAI: (state) => {
            return state.transactions.sDAI.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)
        },
        totalBTC: (state) => {
            return state.transactions.pBTC.reduce((total, t) => total + parseFloat(t.crypto_amount), 0) - state.transactions.sBTC.reduce((total, t) => total + parseFloat(t.crypto_amount), 0);
        },
        totalETH: (state) => {
            return state.transactions.pETH.reduce((total, t) => total + parseFloat(t.crypto_amount), 0) - state.transactions.sETH.reduce((total, t) => total + parseFloat(t.crypto_amount), 0);
        },
        totalDAI: (state) => {
            return state.transactions.pDAI.reduce((total, t) => total + parseFloat(t.crypto_amount), 0)- state.transactions.sDAI.reduce((total, t) => total + parseFloat(t.crypto_amount), 0);
        },
    },
    actions: {
        setLoading(v: boolean) {
            this.loading = v;
        },
        setAllPurchases(data) {
            this.transactions.purchases = data;
        },
        setAllSales(data) {
            this.transactions.sales = data;
        },
        setTransactionRead(data) {
            this.transaction = data;
        },
        setPBTC(data) {
            this.transactions.pBTC = data;
        },
        setPETH(data) {
            this.transactions.pETH = data;
        },
        setPDAI(data) {
            this.transactions.pDAI = data;
        },
        setSBTC(data) {
            this.transactions.sBTC = data;
        },
        setSETH(data) {
            this.transactions.sETH = data;
        },
        setSDAI(data) {
            this.transactions.sDAI = data;
        }

    },



});