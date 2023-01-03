<script lang="ts" setup>
import {
  pageTitleDisplay,
  pageTitleDirection,
  pageTitleBreadcrumbDisplay,
} from "../../../../core/helpers/config";
import { RouterLink, useRoute } from "vue-router";
import { computed } from "vue";

const route = useRoute();

const pageTitle = computed(() => route.meta.pageTitle);
const breadcrumbs = computed(() => route.meta.breadcrumbs);
</script>

<template>
  <Transition
    enter-active-class="animate__animated animate__fadeIn animate__faster"
    leave-active-class="animate__animated animate__fadeOut animate__faster"
    mode="out-in"
  >
    <div
      v-if="pageTitleDisplay"
      :class="`page-title d-flex flex-${pageTitleDirection} justify-content-center flex-wrap me-3`"
      :key="route.path"
    >
      <template v-if="pageTitle">
        <h1
          class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0"
        >
          {{ pageTitle }}
        </h1>
        <span
          v-if="pageTitleDirection === 'row' && pageTitleBreadcrumbDisplay"
          class="h-20px border-gray-200 border-start mx-3"
        ></span>
        <ul
          v-if="breadcrumbs && pageTitleBreadcrumbDisplay"
          class="breadcrumb breadcrumb-separatorless fw-semibold fs-7 my-0 pt-1"
        >
          <!--begin::Item-->
          <li class="breadcrumb-item text-muted">
            <RouterLink to="/" class="text-muted text-hover-primary">
              <i class="fa-solid fa-home"></i>
            </RouterLink>
          </li>
          <template v-for="(item, i) in breadcrumbs" :key="i">
            <!--begin::Item-->
            <li class="breadcrumb-item">
              <span class="bullet bg-gray-400 w-5px h-2px"></span>
            </li>
            <!--end::Item-->
            <!--begin::Item-->
            <li class="breadcrumb-item text-muted">{{ item }}</li>
            <!--end::Item-->
          </template>
        </ul>
      </template>
    </div>
    <div v-else class="align-items-stretch"></div>
  </Transition>
  <!--end::Page title-->
</template>
