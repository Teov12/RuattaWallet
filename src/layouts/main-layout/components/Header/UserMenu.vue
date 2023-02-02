<script lang="ts" setup>
import { useAuth } from "@vueuse/firebase";
import { auth } from "../../../../services/firebase.service";
import {useFirebase} from "../../../../hooks/useFirebase"

const { user } = useAuth(auth);
const {logOut} = useFirebase();

</script>

<template>
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <div class="symbol symbol-50px me-5">
          <img alt="image-user" referrerpolicy="no-referrer" :src="user?.photoURL ? user.photoURL: '/media/avatars/blank.png'" />
        </div>
        <div class="d-flex flex-column">
          <div
            class="fw-bold d-flex align-items-center fs-5"
            v-if="user?.displayName"
          >
            {{ user?.displayName }}
          </div>
          <span class="fw-semobold text-muted text-hover-primary fs-7">
            {{ user?.email }}
          </span>
        </div>
      </div>
    </div>
    <div class="separator my-2"></div>
    <div class="menu-item px-5">
      <a @click="logOut" class="menu-link px-5">Cerrar sesión</a>
    </div>
  </div>
</template>
