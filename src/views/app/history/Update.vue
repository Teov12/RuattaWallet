<script lang="ts" setup>

//Validation
import {cryptoSchema} from "../../../validations/cryptoValidations"
import {useForm} from "vee-validate"
import {ITransaction} from "../../../interfaces/Index"

//Components
import InputTextValidation from '../../../components/InputTextValidation.vue';
import LoaderVue23 from "../../../components/Loader.vue";

//Store
import {useTransactionStore} from "../../../stores/transaction.store"

//Hooks
import {useTransactions} from "../../../hooks/useTransactions";
import {useSweetAlert} from "../../../hooks/useSweetAlert";

import {ref, onMounted} from "vue"
import {useRoute} from "vue-router";
import { apiClient } from "../../../services/api.service";
import router from "../../../router/router";

const route = useRoute();
const {updateTransaction} = useTransactions();
const {showToast, showSwal} = useSweetAlert();

const {transaction} = useTransactionStore();
const isLoading = ref<boolean>(false);

const { setValues, values, handleSubmit } = useForm<ITransaction>({
  initialValues: transaction,
  validationSchema: cryptoSchema,
});

onMounted(async () => {
  isLoading.value = true;
  setTimeout(async () => {
    const id = route.fullPath.split('/')[3];
    await apiClient.get(`/transactions/${id}`)
    .then(
      async (response) => {
        if (response.status ==200) {
          setValues(response.data);
        }
        isLoading.value = false;
      }
    )
  }, 3500);
})

const submit = handleSubmit (async(values) => {
  await updateTransaction(values)
  .then(async ()=> {
    await showSwal('La transaccion se editó correctamente', 'success');
    router.push({path : "/"})
  })
  .catch(async (e) => {
    console.log(e)
    await showToast('No se pudo editar la transaccion', 'error');
  });
})
</script>


<template>

<LoaderVue23
    v-if="isLoading"
    :class-name="'vh-100'"
    :msg="'Buscando información de la transaccion'"
  />

  <template v-else>
    <form @submit.prevent="submit">
        <div class="fv-row mb-10">
          <InputTextValidation
            name="crypto_code"
            label="Criptomoneda"
            placeholder="Ingresa la criptomoneda"
            index="1"
            class-name="form-control-solid"
          />
        </div>
        <div class="fv-row mb-10">
          <InputTextValidation
            name="crypto_amount"
            label="Cantidad"
            placeholder="Ingresa la cantidad"
            index="2"
            class-name="form-control-solid"
          />
        </div>
        <div class="fv-row mb-10">
          <InputTextValidation
            name="money"
            label="Monto"
            placeholder="Ingresa el monto"
            index="3"
            class-name="form-control-solid"
          />
        </div>
        <div class="fv-row mb-10">
          <InputTextValidation
            name="action"
            label="Tipo de transaccion"
            placeholder="Ingresa el tipo de transaccion"
            index="4"
            class-name="form-control-solid"
          />
        </div>
        <div class="fv-row mb-10">
          <InputTextValidation
            name="datetime"
            label="Fecha"
            placeholder="Ingresa la fecha"
            index="5"
            class-name="form-control-solid"
          />
        </div>
        <button class="btn btn-primary">Enviar</button>
    </form>
  </template>
   
</template>