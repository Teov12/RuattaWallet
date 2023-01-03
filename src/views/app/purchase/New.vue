<script lang="ts" setup>
import { ref, watch } from "vue";
import { useAuth } from "@vueuse/firebase";
import { Field, ErrorMessage, useForm } from "vee-validate";
import { auth } from "../../../services/firebase.service";
import { useCryptos } from "../../../hooks/useCyptos";

//  Hooks
const { user } = useAuth(auth);
const { getPriceByValue } =useCryptos()

//  Refs
const crypto_selected = ref<string>("");
const price = ref<number>(0)

const cryptos = [
  { title: "Bitcoin", value: "btc" },
  { title: "Etherium", value: "eth" },
  { title: "DAI", value: "dai" },
  { title: "USDC", value: "usdc" },
];

const { handleSubmit } = useForm({
  initialValues: {
    user_id: user.value?.uid,
    action: "purchase",
    crypto_code: undefined,
    crypto_amount: undefined,
    money: undefined,
    datetime: "",
  },
});

const submit = handleSubmit((values) => {
  values.datetime = new Date().toLocaleString();
  console.log(values);
});

watch(() => crypto_selected.value, () => {
  price.value = getPriceByValue(crypto_selected.value)?.ask!
})
</script>

<template>
  <div class="d-flex justify-content-center py-20">
    <div class="w-500px">
      <form class="form w-100" @submit.prevent="submit">
        <div class="fv-row mb-2">
          <label class="form-label">Seleccioná la criptomoneda</label>
          <Field
            name="crypto_code"
            v-slot="{ field, meta }"
            v-model="crypto_selected"
          >
            <select class="form-select" v-bind="field">
              <option value="">Seleccioná una criptomoneda</option>
              <option v-for="(item, i) in cryptos" :value="item.value">
                {{ item.title }}
              </option>
            </select>
          </Field>
          <ErrorMessage name="crypto_code" class="text-danger" />
        </div>
        <div class="fv-row mb-8">
          <div class="d-flex justify-content-between">
            <span class="fw-bolder">Precio de la cripto:</span>
            <span>$ 295643</span>
          </div>
        </div>
        <div class="fv-row mb-8">
          <label class="form-label">Cantidad</label>
          <Field name="crypto_amount" v-slot="{ field, meta }">
            <input
              v-bind="field"
              step="any"
              type="number"
              class="form-control"
              placeholder="Cantidad de criptomonedas"
            />
          </Field>
          <ErrorMessage name="crypto_amount" class="text-danger" />
        </div>
        <button class="btn btn-primary w-100" type="submit">Comprar</button>
      </form>
    </div>
  </div>
  {{ price }}
</template>
