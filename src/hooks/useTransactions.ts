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

    return {
        getTransactions,
        transactionLoad        
    };
}

