<script lang="ts" setup>
    import { ref } from "vue";
    import { onBeforeMount, onMounted } from "@vue/runtime-core";
    import {useTransactions} from "../../../hooks/useTransactions"
    import {useTransactionStore} from "../../../stores/transaction.store"
    import { ITransaction } from "../../../interfaces/ITransaction";
    import { useRoute } from "vue-router";

    const {getAllTransactions, deleteTransaction, getTransaction, updateTransaction} = useTransactions();

    onBeforeMount(() => {
        getAllTransactions();
    });
    const {transactions} = useTransactionStore();
    const isLoading = ref<boolean>(false);

</script>

<template>
    <h1>Historial</h1>
    
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
                <RouterLink to="/history/read"><button class="btn btn-primary" @click="getTransaction(item._id)">Leer</button></RouterLink>
                <RouterLink to="/history/update/${item.i}"><button class="btn btn-success m-2" @click="getTransaction(item._id)">Modificar</button></RouterLink>
                <button class="btn btn-danger" @click="deleteTransaction(item._id)">
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
                <button class="btn btn-primary" @click="getTransaction(item._id)">Leer</button>
                <button class="btn btn-success m-2" @click="updateTransaction(item._id)">Modificar</button>
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