<script lang="ts" setup>
import { useTransactions } from "../../../hooks/useTransactions";
import { ref, watch, computed } from "vue";
import useCryptoStore from "../../../stores/cryptos.store";
import { useFirebase } from "../../../hooks/useFirebase";
import { ITransaction } from "../../../interfaces/ITransaction";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { cryptoSchema } from "../../../validations/cryptoValidations";
import { useDateFormat, useNow } from "@vueuse/core";
import Swal from "sweetalert2";
import { useTransactionStore } from "../../../stores";

//  Hooks
const { user } = useFirebase();
const { postTransactions } = useTransactions();
//Store
const cryptoStore = useCryptoStore();
//  Refs
const isLoading = ref<boolean>(false);
//

const date = useDateFormat(useNow(), "DD-MM-YYYY HH:mm");

const { handleSubmit, setFieldValue, values } = useForm<ITransaction>({
  initialValues: {
    user_id: user.value?.uid!,
    action: "purchase",
    crypto_code: "",
    crypto_amount: "",
    money: "",
    datetime: "",
  },
  validationSchema: cryptoSchema,
});

const amountValue = computed(() => {
  cryptoStore.getTotalAskPriceByValue(values.crypto_code);
});

const operation = computed(() => {
  return parseFloat(values.crypto_amount) * parseFloat(cryptoStore.getTotalAskPriceByValue(values.crypto_code).toFixed(2).toString());
})

watch(
  () => values.crypto_amount,
  () => setFieldValue("money", operation.value.toFixed(2).toString())
);

const submit = handleSubmit(async (values) => {
  isLoading.value = true; 
  values.crypto_amount = values.crypto_amount;
  values.datetime = date.value;
  values.money;
  console.log(values);

  await postTransactions({
    user_id: user.value?.uid!,
    action: "purchase",
    crypto_code: values.crypto_code,
    crypto_amount: values.crypto_amount,
    money: values.money,
    datetime: date.value,
  })
    .then(() => Swal.fire("Compra exitosa", "", "success"))
    .finally(() => {
      isLoading.value = false;
    });
});
</script>

<template>
  <div class="d-flex justify-content-center py-20">
    <div class="w-500px">
      <form class="form w-100" @submit.prevent="submit">
        <div class="fv-row mb-2">
          <label class="form-label">Seleccioná la criptomoneda</label>
          <Field name="crypto_code" v-slot="{ field }">
            <select class="form-select" v-bind="field">
              <option value="">Seleccioná una criptomoneda</option>
              <option v-for="(item, i) in cryptoStore.getAllCoins" :value="item.value" :key="i">
                {{ item.name }}
              </option>
            </select>
          </Field>
          <ErrorMessage name="crypto_code" class="text-danger" />
        </div>
        <div class="fv-row mb-8">
          <div class="d-flex justify-content-between">
            <span class="fw-bolder">Total a pagar:</span>
            <span>$ {{ values.money }}</span>
          </div>
        </div>
        <div class="fv-row mb-8">
          <label class="form-label">Cantidad</label>
          <Field name="crypto_amount" v-slot="{ field }">
            <input v-bind="field" step="any" type="number" class="form-control" placeholder="Cantidad de criptomonedas" />
          </Field>
          <ErrorMessage name="crypto_amount" class="text-danger" />
        </div>
        <div class="">
          <button type="submit" class="btn btn-primary w-100">
            <span class="spinner-border spinner-border-sm align-middle ms-2" v-if="isLoading"></span>
            Comprar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
