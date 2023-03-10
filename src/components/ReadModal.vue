<script lang="ts" setup>
import { useTransactionStore } from "../stores/transaction.store"
import { useTransactions } from "../hooks/useTransactions";
import { onBeforeMount, onMounted, ref } from "vue";
import { useForm } from "vee-validate";
import { ITransaction } from "../interfaces/ITransaction";
import { apiClient } from "../services/api.service";

const { transaction } = useTransactionStore();


const props = defineProps<{
    transaction: ITransaction;
    id: string
}>();

const { setValues, values } = useForm<ITransaction>({
    initialValues: transaction
})

onBeforeMount(async () => {
    
})
</script>

<template>
    <div class="modal fade" tabindex="-1" :id= "`modal/${id}`">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Transaccion</h5>

                    <!--begin::Close-->
                    <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal"
                        aria-label="Close">
                        <span class="svg-icon svg-icon-2x"></span>
                    </div>
                    <!--end::Close-->
                </div>

                <div class="modal-body">
                    <p>Criptomoneda: {{ props.transaction.crypto_code }}</p>
                    <p>Cantidad: {{ props.transaction.crypto_amount }}</p>
                    <p>Monto: {{ props.transaction.money }}</p>
                    <p>Tipo de transaccion: {{ props.transaction.action }}</p>
                    <p>Fecha: {{ props.transaction.datetime }}</p>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-bs-dismiss="modal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>