import { defineStore } from "pinia";
import { computed, ref } from "vue"
import { ITransaction } from "../interfaces/ITransaction"

export default defineStore("transaction", () => {
    const transaction = ref<ITransaction[]>([]);
    const loading = ref<boolean>(false);

    const allTransactions = computed(() => transaction.value);

    return{
        transaction,
        loading,
        allTransactions,
    };
})
