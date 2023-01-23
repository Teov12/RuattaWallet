import Swal from "sweetalert2";
import { apiClient } from "../services/api.service";
import transctionStore from "../stores/transaction.store"
import { useFirebase } from "./useFirebase"

export function useTransactions(){
    const {transaction, loading:transactionLoad} = transctionStore()
    const { user } = useFirebase();

    async function getTransactions(x) {
        await apiClient.get(`/transactions?q={"user_id": "${user.value?.uid}"}`)
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
        
    }

    async function postTransactions(body) {
        await apiClient.post(`/transactions`, body)
        .then((res) => console.log(res))
        .catch((err) => console.log(err))
    }

    return {
        getTransactions,
        transactionLoad,
        postTransactions       
    };
}

