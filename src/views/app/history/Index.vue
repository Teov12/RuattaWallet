<script lang="ts" setup>
import { ref } from "vue";
import { onBeforeMount, onMounted } from "@vue/runtime-core";
import { useTransactions } from "../../../hooks/useTransactions"
import { useTransactionStore } from "../../../stores/transaction.store"
import RealModal from '../../../components/ReadModal.vue';
import { ITransaction } from "../../../interfaces/ITransaction";
import Loader from "../../../components/Loader.vue";

const { getAllTransactions, deleteTransaction, getTransaction } = useTransactions();



const { transactions } = useTransactionStore();
const isLoading = ref<boolean>(false);

const selectedTrans = ref<ITransaction>({
    _id: '',
    user_id: '',
    action: '',
    crypto_code: '',
    crypto_amount: '',
    money: 0,
    datetime: ''
})

onMounted( async () => {
    isLoading.value = true;
    await getAllTransactions()
    .then(() => 
        isLoading.value = false
    );
});
</script>

<template >
    <Loader msg="Cargando transacciones" v-if="isLoading" ></Loader>

    <div v-else>
        <RealModal :transaction="selectedTrans"></RealModal>

        <div class="container">
            <h3>Compras</h3>
            <div class="container d-flex align-items-center justify-content-center" v-if="transactions.purchases.length == 0">
                <h5>No se han efectuado compras hasta el momento</h5>
            </div>
            <div v-else>
                <table class="table container">
                    <thead>
                        <tr>
                           <th scope="col">#</th>
                           <th scope="col">Criptomoneda</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">Dinero</th>


                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, i) in transactions.purchases" :key="i">
                            <th>{{ i + 1 }}</th>
                            <td>{{ item.crypto_code.toLocaleUpperCase() }}</td>
                            <td>{{ item.crypto_amount }}</td>
                            <td>{{ item.money }}</td>
                            <button 
                                type="button" @click="() => (selectedTrans = item)" class="btn btn-primary m-2"
                                data-bs-toggle="modal" data-bs-target="#exampleModal">
                                Ver
                            </button>
                            <RouterLink @click="() => getTransaction(item._id)" class="btn btn-success m-2"
                                :to="`/history/update/${item._id}`">
                                Modificar</RouterLink>
                            <button class="btn btn-danger" @click="() => deleteTransaction(item._id)">
                                Eliminar
                                <span class="spinner-border spinner-border-sm align-middle ms-2" v-if="isLoading"></span>
                            </button>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="m-5">
                <h3>Ventas</h3>
                <div 
                    class="container d-flex justify-content-center " 
                    v-if="transactions.sales.length == 0">
                    <h5>No se han efectuado ventas hasta el momento</h5>
                </div>
                <div v-else>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Criptomoneda</th>
                                <th scope="col">Cantidad</th>
                                <th scope="col">Dinero</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, i) in transactions.sales" :key="i">
                                <th>{{ i + 1 }}</th>
                                <td>{{ item.crypto_code.toLocaleUpperCase() }}</td>
                                <td>{{ item.crypto_amount }}</td>
                                <td>{{ item.money }}</td>
                                <button type="button" @click="() => (selectedTrans = item)" class="btn btn-primary m-2"
                                    data-bs-toggle="modal" data-bs-target="#exampleModal">Ver</button>

                                <RouterLink :to="`/history/update/${item._id}`"><button class="btn btn-success m-2"
                                        @click="() => getTransaction(item._id)">Modificar</button></RouterLink>

                                <button class="btn btn-danger" @click="deleteTransaction(item._id)">
                                    <span class="spinner-border spinner-border-sm align-middle ms-2" v-if="isLoading">
                                    </span>
                                    Eliminar
                                </button>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>