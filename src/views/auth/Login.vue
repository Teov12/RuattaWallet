<script lang="ts" setup>
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as Yup from "yup";
import { useFirebase } from "../../hooks/useFirebase";
import {useSweetAlert} from "../../hooks/useSweetAlert"

//  Components
import ButtonSignInGoogleVue from "./components/ButtonSignInGoogle.vue";

const {toastSuccess} = useSweetAlert();

const { login } = useFirebase();
const { handleSubmit } = useForm({
  validationSchema: Yup.object().shape({
    email: Yup.string().required(),
    password: Yup.string().required(),
  }),
});

const submit = handleSubmit(async (values) => {
  const { email, password } = values;
  await login(email, password);
});
</script>

<template>
  <form class="form w-100" @submit.prevent="submit">
    <div class="text-center mb-11">
      <h1 class="text-dark fw-bolder fs-1 mb-3">Ingresar</h1>
      <div>
        <span class="w-125px text-gray-500 fw-semibold fs-7">Ingrese con su correo electrónico</span>
      </div>
    </div>
    <div class="fv-row mb-8">
      <label class="form-label fw-bolder">Correo electrónico</label>
      <Field name="email" v-slot="{ field, meta }">
        <input
          v-bind="field"
          class="form-control form-control-solid"
          type="text"
          placeholder="Ingrese su email"
          :class="[{ 'border-danger is-invalid': meta.touched && !meta.valid }]"
        />
      </Field>
      <ErrorMessage name="email" class="text-danger" />
    </div>
    <div class="fv-row mb-8">
      <label class="form-label fw-bolder">Contraseña</label>
      <Field name="password" v-slot="{ field, meta }">
        <input
          v-bind="field"
          class="form-control form-control-solid"
          type="password"
          placeholder="Ingrese su contraseña"
          :class="[{ 'border-danger is-invalid': meta.touched && !meta.valid }]"
        />
      </Field>
      <ErrorMessage name="password" class="text-danger" />
    </div>
    <button class="btn btn-primary w-100 mb-8">Ingresar</button>
    <div class="text-center mb-8">
      <span>No tiene cuenta?</span>
      <RouterLink to="/register" class="btn btn-text-primary">
        Registrarse aquí
      </RouterLink
      >
    </div>
      <div class="separator separator-content my-14">
        <span class="w-125px text-gray-500 fw-semibold fs-7">O con sus redes sociales</span>
      </div>
      <ButtonSignInGoogleVue />
  </form>
</template>
