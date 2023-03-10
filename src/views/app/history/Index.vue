<script lang="ts" setup>
    import { ref } from "vue";
    import { onBeforeMount, onMounted } from "@vue/runtime-core";
    import {useTransactions} from "../../../hooks/useTransactions"
    import {useTransactionStore} from "../../../stores/transaction.store"
    import RealModal from '../../../components/ReadModal.vue';
    import {Modal} from "bootstrap";
import { ITransaction } from "../../../interfaces/ITransaction";

    const {getAllTransactions, deleteTransaction, getTransaction} = useTransactions();
    
    onBeforeMount(() => {
        getAllTransactions();
    });
    const {transactions, transaction} = useTransactionStore();
    const isLoading = ref<boolean>(false);

        
    const showModal = () => {
        const modal = new Modal(document.getElementById(`modal/${transaction._id}`), { keyboard: false });
        modal.show();
    };


</script>

<template>
    <h1>Historial</h1>
    <RealModal :id="transaction._id" :transaction="transaction"></RealModal>
    <h4>Compras</h4>
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
            <tr v-for="(item, i) in transactions.purchases" :key="i">
                <th>{{ i+1 }}</th>
                <td>{{item.crypto_code}}</td>
                <td>{{item.crypto_amount}}</td>
                <td>{{item.money}}</td>
                <button  type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target=".bs-example-modal-lg" @click="()=>showModal()">Detalles</button>
                <RouterLink :to="`/history/update/${item._id}`"><button class="btn btn-success m-2" @click="()=>getTransaction(item._id)">Modificar</button></RouterLink>
                <button class="btn btn-danger" @click="()=>deleteTransaction(item._id)">
                    Eliminar
                    <span
                        class="spinner-border spinner-border-sm align-middle ms-2" 
                        v-if="isLoading"
                    ></span>
                </button>
            </tr>
        </tbody>                                   
    </table>

    <h4>Ventas</h4>
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
            <tr v-for="(item,i) in transactions.sales" :key="i">
                <th>{{ i+1 }}</th>
                <td>{{item.crypto_code}}</td>
                <td>{{item.crypto_amount}}</td>
                <td>{{item.money}}</td>
                <button class="btn btn-primary" @click="getTransaction(item._id)">Detalles</button>
                <RouterLink :to="`/history/update/${item._id}`"><button class="btn btn-success m-2" @click="getTransaction(item._id)">Modificar</button></RouterLink>
                <button class="btn btn-danger" @click="deleteTransaction(item._id)">
                    <span 
                        class="spinner-border spinner-border-sm align-middle ms-2" 
                        v-if="isLoading"
                    ></span>
                    Eliminar
                </button>
            </tr>
        </tbody>
    </table>
</template>