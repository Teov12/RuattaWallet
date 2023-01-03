<script lang="ts" setup>
import { Field, ErrorMessage, useForm } from "vee-validate";
import * as Yup from "yup";
import { useFirebase } from "../../hooks/useFirebase";

//  Components
import ButtonSignInGoogleVue from "./components/ButtonSignInGoogle.vue";

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
    <div class="text-center mb-8">
      <h1>Ingresar</h1>
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
      <RouterLink to="/register" class="btn btn-text-primary"
        >Registrarse aquí</RouterLink
      >
    </div>
    <ButtonSignInGoogleVue />
  </form>
</template>
