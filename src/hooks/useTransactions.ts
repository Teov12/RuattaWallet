import Swal from "sweetalert2";
import { apiClient } from "../services/api.service";
import transctionStore from "../stores/transaction.store"
import { useFirebase } from "./useFirebase"

export function useTransactions(){
    const {transaction, loading:transactionLoad} = transctionStore()
    const { user } = useFirebase();

    async function getTransactions() {
        await apiClient.get(`/transactions/${user.value?.uid}`)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        
    }

    async function postTransactions() {
        await apiClient.post(`/transactions`)
        Swal.fire("Compra realizada", "", "success")
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    }

    return {
        getTransactions,
        transactionLoad        
    };
}

