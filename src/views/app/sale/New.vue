<script lang="ts" setup>
import { useForm, ErrorMessage, Field } from "vee-validate";
import { useRouter } from "vue-router";
import { useTransactions } from "../../../hooks/useTransactions";
import { ref, watch, onMounted, computed, watchEffect } from "vue";
import useCryptoStore from "../../../stores/cryptos.store";
import Swal from "sweetalert2";
import { useFirebase } from "../../../hooks/useFirebase";
import { ITransaction } from "../../../interfaces/ITransaction";
import { useDateFormat, useNow } from "@vueuse/core";
import { cryptoSchema } from "../../../validations/cryptoValidations";
import { useTransactionStore } from "../../../stores/transaction.store";

onMounted(async () => {
  await getAllTransactions();
});

const router = useRouter();

//Hooks
const { user } = useFirebase();
const { postTransactions, getAllTransactions } = useTransactions();

//Store
const cryptoStore = useCryptoStore();
const { totalBTC, totalDAI, totalETH } = useTransactionStore();

//Refs
const isLoading = ref<boolean>(false);

//const
const date = useDateFormat(useNow(), "DD-MM-YYYY HH:mm");

const { handleSubmit, setFieldValue, values } = useForm<ITransaction>({
  initialValues: {
    user_id: user.value?.uid!,
    action: "sale",
    crypto_code: "",
    crypto_amount: "",
    money: "0",
    datetime: "",
  },
  validationSchema: cryptoSchema,
});

const operation = computed(() => {
  if (values.crypto_amount === "") {
    return 0;
  } else return parseFloat(values.crypto_amount) * parseFloat(cryptoStore.getTotalAskPriceByValue(values.crypto_code).toFixed(2).toString());
});

watchEffect(() => {
  values.crypto_amount, setFieldValue("money", operation.value.toFixed(2).toString());
});

const submit = handleSubmit(async (values) => {
  let totalCryptos = 0;
  switch (values.crypto_code) {
    case "btc":
      totalCryptos = totalBTC;
      break;
    case "dai":
      totalCryptos = totalDAI;
      break;
    case "eth":
      totalCryptos = totalETH;
      break;
    default:
      // Si no se selecciona ninguna criptomoneda, muestra un mensaje de error
      Swal.fire("Error", "Por favor, selecciona una criptomoneda", "error");
      return;
  }

  if (parseFloat(values.crypto_amount) > totalCryptos) {
    // Si la cantidad ingresada es mayor a la cantidad total, muestra un mensaje de error
    Swal.fire("Error", "No puedes vender más criptomonedas de las que tienes", "error");
    return;
  }

  isLoading.value = true;
  values.money;
  values.datetime = date.value;
  console.log(values);

  await postTransactions({
    user_id: user.value?.uid!,
    action: "sale",
    crypto_code: values.crypto_code,
    crypto_amount: values.crypto_amount,
    money: values.money,
    datetime: date.value,
  })
    .then(() => Swal.fire("Venta exitosa", "", "success"))
    .catch((err) => console.log(err))
    .finally(() => {
      isLoading.value = false;
      router.push({ path: "/home" });
    });
});
</script>

<template>
  <div class="card shadow row col-12 col-sm-12 col-lg-12">
    <div class="d-flex justify-content-center align-content-center py-7 row">
      <div class="w-500px">
        <form class="form w-100" @submit.prevent="submit">
          <div class="fv-row mb-2 col-12 col-sm-12 col-lg-12">
            <label class="form-label">Seleccioná la criptomoneda</label>
            <Field name="crypto_code" v-slot="{ field }">
              <select class="form-select" v-bind="field">
                <option value="">Seleccioná una criptomoneda</option>
                <option v-for="(item, i) in cryptoStore.getAllCoins" :value="item.value">
                  {{ item.name }}
                </option>
              </select>
            </Field>
            <ErrorMessage name="crypto_code" class="text-danger" />
          </div>
          <div class="fv-row mb-8 col-12">
            <div class="d-flex justify-content-between">
              <span class="fw-bolder">Precio de la cripto:</span>
              <span>$ {{ values.money }}</span>
            </div>
          </div>
          <div class="fv-row mb-8 col-12">
            <label class="form-label">Cantidad</label>
            <Field name="crypto_amount" v-slot="{ field }">
              <input v-bind="field" type="number" step="any" class="form-control" placeholder="Cantidad de criptomonedas" />
            </Field>
            <ErrorMessage name="crypto_amount" class="text-danger" />
          </div>
          <div class="">
            <button type="submit" class="btn btn-primary w-100" @submit="submit">
              <span class="spinner-border spinner-border-sm align-middle ms-2" v-if="isLoading"></span>
              Vender
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
