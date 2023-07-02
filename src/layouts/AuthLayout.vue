<script lang="ts" setup>
import {onMounted, onUnmounted} from "vue";

onMounted(() => {
  document.body.classList.add("app-blank");
});

onUnmounted(() => {
  document.body.classList.remove("app-blank");
});
</script>
<template>
  <div class="d-flex flex-column flex-root vh-100" id="kt_app_root">
    <div class="d-flex flex-column flex-lg-row flex-column-fluid">
      <div
        class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
      >
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <div class="w-lg-500px p-10">
            <RouterView v-slot="{ Component, route }">
              <Transition
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
              >
                <div :key="route.fullPath">
                  <component :is="Component"></component>
                </div>
              </Transition>
            </RouterView>
          </div>
        </div>
      </div>
      <div
        class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-2"
        style="background-image: url(media/misc/auth-bg.png)"
      >
        <div
          class="d-flex flex-column flex-center py-7 py-lg-15 px-5 px-md-15 w-100"
        >
          <h1
            class="d-none d-lg-block text-white fs-2qx fw-bolder text-center mb-7"
          >
            Rapido, Eficiente y Productivo
          </h1>
          <div class="d-none d-lg-block text-white fs-base text-center">
            Bienvenido a nuestra
            <a href="#" class="opacity-75-hover text-warning fw-bold me-1"
              >exchange</a
            >de criptomonedas la mejor exchange <br />donde podrás comprar
            y vender tus criptomonedas al
            <a href="#" class="opacity-75-hover text-warning fw-bold me-1"
              >mejor precio</a
            >y con la mejor <br />seguridad brindada.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
