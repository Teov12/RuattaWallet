<script lang="ts" setup>
import { toolbarWidthFluid } from "../../../../core/helpers/config";
import PageTitleVue from "./PageTitle.vue";
</script>

<template>
  <div id="kt_app_toolbar" class="app-toolbar py-6">
    <div
      id="kt_app_toolbar_container"
      class="app-container d-flex flex-stack"
      :class="{
        'container-fluid': toolbarWidthFluid,
        'container-xxl': !toolbarWidthFluid,
      }"
    >
      <PageTitleVue />
    </div>
  </div>
</template>
