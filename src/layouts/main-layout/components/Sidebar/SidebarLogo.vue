<template>
  <div class="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
    <router-link to="/">
      <img
        alt="Logo"
        src="/media/weve/logos/logo-white-small.svg"
        class="h-35px app-sidebar-logo-default"
      />
      <img
        alt="Logo"
        src="/media/weve/logos/logo-white.svg"
        class="h-20px app-sidebar-logo-minimize"
      />
    </router-link>
    <div
      id="kt_app_sidebar_toggle"
      class="app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate"
      data-kt-toggle="true"
      data-kt-toggle-state="active"
      data-kt-toggle-target="body"
      data-kt-toggle-name="app-sidebar-minimize"
    >
      <span class="svg-icon svg-icon-2 rotate-180">
        <i class="fa-solid fa-arrow-left"></i>
      </span>
    </div>
  </div>
</template>