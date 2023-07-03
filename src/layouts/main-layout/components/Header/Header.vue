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
          <span class="svg-icon svg-icon-1">
            <i class="fa-solid fa-house"></i>
          </span>
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
