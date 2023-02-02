import { defineStore } from "pinia";
import { computed, ref } from "vue"
import { ITransaction } from "../interfaces/ITransaction"

    interface WalletState {
        loading: boolean,
        transactions: {
            purchases: ITransaction[],
            sales: ITransaction[]
        },
        transaction: ITransaction,
    }




export const useTransactionStore = defineStore("transaction", {
    state: (): WalletState => ({
        loading: true,
        transactions: {
            purchases: [],
            sales: []
        },
        transaction:{
            _id: '',
            user_id: '',
            action: '',
            crypto_code: '',
            crypto_amount: 0,
            money: 0,
            datetime: ''
        }
    }),
    getters: {
        getLoading(state) {
            return state.loading;
        },
        getPurchases: (state) => (value: string) => {
            return state.transactions.purchases.filter(
                (p) => p.crypto_code === value
            );
        },
        getSales: (state) => (value: string) => {
            return state.transactions.sales.filter(
                (p) => p.crypto_code === value
            );
        },
        getTransactionRead: (state) => (value:Object) => {
            return state.transaction == value;
        } 
    },
    actions: {
        setLoading(v: boolean) {
            this.loading = v;
        },
        setAllPurchases(data) {
            this.transactions.purchases = data;
        },
        setAllSales(data){
            this.transactions.sales = data;
        },
        setTransactionRead(data) {
            this.transaction = data;
        }

    },
});
