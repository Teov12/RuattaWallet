<script lang="ts" setup>
import {useForm, ErrorMessage, Field} from "vee-validate";
import {ref, watch} from "vue";
import { useAuth } from "@vueuse/firebase";
import { auth } from "../../../services/firebase.service";
import { useCryptos } from "../../../hooks/useCyptos";
import { number, object, string } from "yup";

//Hooks
const {user} = useAuth(auth);
const { getPriceByValue } = useCryptos();

//Refs
const crypto_selected = ref<string>("");
const price = ref<number>(0)

const cryptos = [
  { title: "Bitcoin", value: "btc" },
  { title: "Etherium", value: "eth" },
  { title: "DAI", value: "dai" },
  { title: "USDC", value: "usdc" },
];

const pruchaseSchema = object().shape({
  crypto_amount: number().required("El campo debe ser obligatorio").min(0, "La cantidad a vender no tiene que ser menor a 0"),
})

const {handleSubmit} = useForm({
  validationSchema: pruchaseSchema,
  initialValues: {
    user_id: user.value?.uid,
    action: "sale",
    crypto_code: undefined,
    crypto_amount: undefined,
    money: undefined,
    datetime: "",
  },
});

const submit = handleSubmit((values) => {
  values.datetime = new Date().toLocaleDateString();
  console.log(values);
});

watch(() => crypto_selected.value, () => {
  price.value = getPriceByValue(crypto_selected.value)?.bid!
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
            v-slot="{ field, meta}"
            v-model="crypto_selected"
          >
            <select class="form-select" v-bind="field">
              <option value="">Seleccioná una criptomoneda</option>
              <option v-for="(item, i) in cryptos" :value="item.value">
                {{ item.title }}
              </option>
            </select>
          </Field>
          <ErrorMessage name="crypto_code" class="text-danger"/>
        </div>
        <div class="fv-row mb-8">
          <div class="d-flex justify-content-between">
            <span class="fw-bolder">Precio de la cripto:</span>
            <span>$312341</span>
          </div>  
        </div>
        <div class="fv-row mb-8">
          <label class="form-label">Cantidad</label>
          <Field name="crypto_amount" v-slot="{field, meta}">
            <input v-bind="field"
              type="number"
              step="any"
              class="form-control"
              placeholder="Cantidad de criptomonedas"
            />
          </Field>
          <ErrorMessage name="crypto_amount" class="text-danger"/>
        </div>
        <button class=" btn btn-primary w-100" type="submit">Vender</button>
      </form>
    </div>
  </div>
  {{ price }}
</template>

