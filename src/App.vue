<script lang="ts" setup>
import { nextTick, onMounted } from "vue";
import { initializeComponents } from "./core/plugins/keenthemes";
import { useConfigStore } from "./stores/config.store";
import {useTransactions} from "../src/hooks/useTransactions"

const configStore = useConfigStore();
const {getTransactions} = useTransactions();

onMounted(() => {
  configStore.overrideLayoutConfig();
   getTransactions();
  nextTick(() => {
    initializeComponents();
  });
});
</script>

<template>
  <RouterView />
</template>

<style lang="scss">
@import "animate.css";
@import "sweetalert2/dist/sweetalert2.css";

@import "assets/sass/element-ui.dark";
@import "assets/sass/plugins";
@import "assets/sass/style";

#app {
  display: contents;
}
</style>
