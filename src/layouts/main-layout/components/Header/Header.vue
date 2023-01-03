<script lang="ts" setup>
import NavbarVue from "./Navbar.vue";
</script>

<template>
  <div id="kt_app_header" class="app-header">
    <div
      class="app-container d-flex align-items-stretch justify-content-between container-fluid"
    >
      <div
        class="d-flex align-items-center flex-grow-1 flex-lg-grow-0 me-lg-15"
      >
        <RouterLink to="/">
          <img
            alt="Logo"
            src="/media/weve/logos/logo-white.svg"
            class="h-20px h-lg-30px app-sidebar-logo-default"
          />
        </RouterLink>
      </div>
      <div
        class="d-flex align-items-center d-lg-none ms-n2 me-2"
        title="Show sidebar menu"
      >
        <div
          class="btn btn-icon btn-active-color-primary w-35px h-35px"
          id="kt_app_sidebar_mobile_toggle"
        >
          <span class="svg-icon svg-icon-1">
            <i class="fa-solid fa-bars fs-1"></i>
          </span>
        </div>
      </div>
      <div class="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <router-link to="/" class="d-lg-none">
          <img
            alt="Logo"
            src="/media/weve/logos/logo-primary.svg"
            class="h-30px"
          />
        </router-link>
      </div>
      <div
        class="d-flex align-items-stretch justify-content-end flex-lg-grow-1"
        id="kt_app_header_wrapper"
      >
        <NavbarVue />
      </div>
    </div>
  </div>
</template>
