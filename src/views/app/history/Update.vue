<script lang="ts" setup>
import {cryptoSchema} from "../../../validations/cryptoValidations"
import {useForm} from "vee-validate"
import {ITransaction} from "../../../interfaces/Index"
import InputTextValidation from '../../../components/InputTextValidation.vue';
import {useTransactionStore} from "../../../stores/transaction.store"

const {transaction} = useTransactionStore();


const { setValues, values } = useForm<ITransaction>({
  initialValues: transaction,
  validationSchema: cryptoSchema,
});

const submit = () => {

}
</script>


<template>
<form @submit="submit">
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
</form>      
   
</template>