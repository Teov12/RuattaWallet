<script lang="ts" setup>
import { nextTick, onMounted, watch, onBeforeMount } from "vue";
import { useRoute } from "vue-router";
import { useAuth } from "@vueuse/firebase";
import { useCryptos } from "../../hooks/useCyptos";
import authStore from "../../stores/auth.store";
import { auth } from "../../services/firebase.service";
import { reinitializeComponents } from "../../core/plugins/keenthemes";
import { useConfigStore } from "../../stores/config.store";
import LayoutServices from "../../core/services/LayoutServices";
import { contentWidthFluid } from "../../core/helpers/config";

//  Components
import HeaderVue from "./components/Header/Header.vue";
import FooterVue from "./components/Footer/Footer.vue";
import SidebarVue from "./components/Sidebar/Sidebar.vue";
import ToolbarVue from "./components/Toolbar/Toolbar.vue";

//  Hooks
const route = useRoute();
const { getAllPrices } = useCryptos();
const { user } = useAuth(auth);

//  Stores
const store = authStore();
const configStore = useConfigStore();

onBeforeMount(async () => {LayoutServices.init(), await getAllPrices()});


onMounted(async () => {
  configStore.overrideLayoutConfig();
  nextTick(() => {
    reinitializeComponents();
    setInterval(async () =>{
      getAllPrices();
    }, 10000);
    store.setUser(user.value!);
  });
});

watch(
  () => route.path,
  () => nextTick(() => reinitializeComponents())
);
</script>

<template>
  <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
    <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
      <HeaderVue />
      <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
        <SidebarVue />
        <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
          <div class="d-flex flex-column flex-column-fluid">
            <ToolbarVue />
            <div id="kt_app_content" class="app-content flex-column-fluid">
              <div id="kt_app_content" class="app-content flex-column-fluid">
                <!--begin::Content container-->
                <div
                  id="kt_app_content_container"
                  class="app-container"
                  :class="{
                    'container-fluid': contentWidthFluid,
                    'container-xxl': !contentWidthFluid,
                  }"
                >
                  <RouterView v-slot="{ Component, route }">
                    <Transition
                      enter-active-class="animate__animated animate__fadeIn animate__faster"
                      leave-active-class="animate__animated animate__fadeOut animate__faster"
                      mode="out-in"
                    >
                      <div :key="route.name?.toString()">
                        <component :is="Component"></component>
                      </div>
                    </Transition>
                  </RouterView>
                </div>
                <!--end::Content container-->
              </div>
            </div>
          </div>
          <FooterVue />
        </div>
      </div>
    </div>
  </div>
</template>
