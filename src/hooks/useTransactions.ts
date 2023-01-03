import useUser from "../stores/auth.store"
import { useForm } from "vee-validate";
import { useAuth } from "@vueuse/firebase";
import * as Yup from "yup";
import {ref} from "vue";
import { useCryptos } from "./useCyptos"
import { useRouter } from "vue-router"
import Swal from "sweetalert2"
import { getTransactions, postTransactions } from "../services/api.service"
import { auth } from "../services/firebase.service";
import { async } from "@firebase/util";
import { number } from "yup";




export const useTransactions = () =>{
    const {user} = useAuth(auth);
    const router = useRouter();
    const {getAllPrices} = useCryptos();


    const purchaseSchema = Yup.object({
        crypto_amount: Yup.number().required("El campo debe ser obligatorio").min(0, "La cantidad a vender no tiene que ser menor a 0"),
    })

    const {handleSubmit} = useForm({validationSchema: purchaseSchema})

    const RequestBody = ref({
        user_id: user.value?.uid,
        action: "",
        crypto_code: "",
        crypto_amount: "",
        money: "",
        datetime: "",
    });

    const setPurchase = handleSubmit(async(values) => {
        getAllPrices();
        RequestBody.value.action = "purchase";
        RequestBody.value.crypto_code = values.crypto_code.code;
        RequestBody.value.crypto_amount = values.crypto_amount;
        RequestBody.value.datetime = new Date().toLocaleDateString();
        const status = await postTransactions(RequestBody.value);
        if (status == 201) Swal.fire("Compra efectuada", undefined, "success").then(() => router.push({path: "/home"}));
    });
    
    return {setPurchase}
}