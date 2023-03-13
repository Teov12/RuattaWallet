<script lang="ts" setup>
import { useTransactionStore } from "../stores/transaction.store"
import { ITransaction } from "../interfaces/ITransaction";

const { transaction } = useTransactionStore();


const props = defineProps<{
    transaction: ITransaction;

}>();

</script>

<template>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Transaccion</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <p>Criptomoneda: {{ props.transaction.crypto_code.toLocaleUpperCase() }}</p>
            <p>Cantidad: {{ props.transaction.crypto_amount }}</p>
            <p>Valor: {{ props.transaction.money }}</p>
            <p>Accion: {{ props.transaction.action }}</p>
            <p>Fecha: {{ props.transaction.datetime }}</p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>