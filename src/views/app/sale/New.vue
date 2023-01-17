<script lang="ts" setup>
import {useForm, ErrorMessage, Field} from "vee-validate";
import {ref, watch} from "vue";
import useCryptoStore from "../../../stores/cryptos.store"
import Swal from "sweetalert2";
import { useFirebase } from "../../../hooks/useFirebase";
import { ITransaction } from "../../../interfaces/ITransaction";
import { useDateFormat, useNow } from "@vueuse/core";
import { cryptoSchema } from "../../../validations/cryptoValidations";

//Hooks
const {user} = useFirebase();

//Store
const cryptoStore = useCryptoStore();

//Refs
const isLoading = ref<boolean>(false)

//const
const date = useDateFormat(useNow(), 'DD-MM-YYYY HH:mm')

const {handleSubmit, setFieldValue, values} = useForm<ITransaction>({
  initialValues: {
    user_id: user.value?.uid!,
    action: "sale",
    crypto_code: "",
    crypto_amount: 0,
    money: 0,
    time: "",
  },
  validationSchema: cryptoSchema
});

watch(
  () => values.crypto_amount, 
  () => {
  setFieldValue("money", values.crypto_amount * cryptoStore.getTotalBidPriceByValue(values.crypto_code))
})

const submit = handleSubmit((values) => {
  isLoading.value = true;
  values.money.toFixed(2).toString();
  values.time = date.value
  Swal.fire("Venta exitosa", "", "success")
  console.log(values);
});

</script>

<template>
  <div class="d-flex justify-content-center py-20">
    <div class="w-500px">
      <form class="form w-100" @submit.prevent="submit">
        <div class="fv-row mb-2">
          <label class="form-label">Seleccioná la criptomoneda</label>
          <Field
            name="crypto_code"
            v-slot="{ field}"
          >
            <select class="form-select" v-bind="field">
              <option value="">Seleccioná una criptomoneda</option>
              <option v-for="(item, i) in cryptoStore.getAllCoins" :value="item.value">
                {{ item.name }}
              </option>
            </select>
          </Field>
          <ErrorMessage name="crypto_code" class="text-danger"/>
        </div>
        <div class="fv-row mb-8">
          <div class="d-flex justify-content-between">
            <span class="fw-bolder">Precio de la cripto:</span>
            <span>$ {{ values.money }}</span>
          </div>  
        </div>
        <div class="fv-row mb-8">
          <label class="form-label">Cantidad</label>
          <Field name="crypto_amount" v-slot="{field}">
            <input 
              v-bind="field"
              type="number"
              step="any"
              class="form-control"
              placeholder="Cantidad de criptomonedas"
            />
          </Field>
          <ErrorMessage name="crypto_amount" class="text-danger"/>
        </div>
        <div class="">
        <button type="submit" class="btn btn-primary w-100">
          <span
            class="spinner-border spinner-border-sm align-middle ms-2"
            v-if="isLoading"
          ></span>
          Vender
        </button>
      </div>
      </form>
    </div>
  </div>
</template>

