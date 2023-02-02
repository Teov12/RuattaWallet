<script lang="ts" setup>
import { useAuth } from "@vueuse/firebase";
import { auth } from "../../../../services/firebase.service";

//  Components
import UserMenuVue from "./UserMenu.vue";
import ThemeModeVue from "./ThemeMode.vue";

//  Hooks
const { user } = useAuth(auth);
</script>

<template>
  <div class="app-navbar flex-shrink-0">
    <ThemeModeVue />
    <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
      <div
        class="cursor-pointer symbol symbol-35px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <img
          alt="image-user"
          referrerpolicy="no-referrer"
          :src="user?.photoURL ? user.photoURL : '/media/avatars/blank.png'"
        />
      </div>
      <UserMenuVue />
    </div>
  </div>
</template>
