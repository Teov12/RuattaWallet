import Swal from "sweetalert2";
import { apiClient } from "../services/api.service";
import {useRouter} from "vue-router";
import { useFirebase } from "./useFirebase"
import {useTransactionStore} from "../stores/transaction.store";
import { ITransaction } from "../interfaces/ITransaction";
import { useSweetAlert } from "./useSweetAlert";
import { ref } from "@vue/reactivity";

const {swalConfirmDialog} = useSweetAlert();
const isLoading = ref<boolean>(false)

export function useTransactions(){


    const { user } = useFirebase();
    const transactionStore = useTransactionStore();
    const {transactions} = useTransactionStore();
    const router = useRouter();


    async function getAllTransactions() {
        await apiClient.get(`/transactions?q={"user_id": "${user.value?.uid}"}`)
        .then((res) => {
            const purchases = res.data.filter((p) => p.action == "purchase");
            if (purchases) transactionStore.setAllPurchases(purchases);
            
            const purchasesBTC = res.data.filter((p) => p.crypto_code == "btc" && p.action == "purchase");
            if (purchasesBTC)  transactionStore.setPBTC(purchasesBTC);

            const purchasesETH = res.data.filter((p) => p.crypto_code == "eth" && p.action == "purchase");
            if (purchasesETH)  transactionStore.setPETH(purchasesETH);

            const purchasesDAI = res.data.filter((p) => p.crypto_code == "dai" && p.action == "purchase");
            if (purchasesDAI)  transactionStore.setPDAI(purchasesDAI);

            // console.log(purchasesBTC);
            // console.log(purchasesETH);
            // console.log(purchasesDAI);

            const sales = res.data.filter((p) => p.action == "sale");
            if (sales) transactionStore.setAllSales(sales);

            const salesBTC = res.data.filter((p) => p.crypto_code == "btc" && p.action == "sale");
            if (salesBTC)  transactionStore.setSBTC(salesBTC);

            const salesETH = res.data.filter((p) => p.crypto_code == "eth" && p.action == "sale");
            if (salesETH)  transactionStore.setSETH(salesETH);


            const salesDAI = res.data.filter((p) => p.crypto_code == "dai" && p.action == "sale");
            if (salesDAI)  transactionStore.setSDAI(salesDAI);

            // console.log(salesBTC);
            // console.log(salesETH);
            // console.log(salesDAI);


        })
        .catch((error) => console.log(error)).finally(() => transactionStore.setLoading(false));
    }
    
    async function getTransaction(id) {
        await apiClient.get(`/transactions/${id}`)
        .then((res) => {
            const transaction = {
                _id: res.data._id,
                money: res.data.money,
                action: res.data.action,
                crypto_amount: res.data.crypto_amount,
                crypto_code: res.data.crypto_code,
                datetime: res.data.datetime
            };
            console.log(transaction);
            transactionStore.setTransactionRead(transaction);
        })
        .catch((e) => console.log(e));
    }
    
    async function postTransactions(body: ITransaction) {
        await apiClient.post(`/transactions`, body)
        .then(async() => getAllTransactions)
        .catch((err) => console.log(err))
    }

    async function deleteTransaction(id) {
        isLoading.value = true;
        swalConfirmDialog(
            "¿Seguro que eliminar la transaccion?",
            "Si, eliminar!",
            "No",
            async() => {
                await apiClient.delete(`/transactions/${id}`)
                .then(async() => await getAllTransactions())    
            }   
        )
            
    }


    async function updateTransaction(values: ITransaction) {
        await apiClient.patch(`/transactions/${values._id}`, values)
        .then(async (res) => {
            console.log(res)
            await getTransaction(values._id);
        })
        .catch((e) => console.log(e));
    }

    return {
        getAllTransactions,
        postTransactions,
        deleteTransaction,       
        getTransaction,
        updateTransaction,
    };
}

