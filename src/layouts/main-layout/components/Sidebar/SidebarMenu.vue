<script lang="ts" setup>
import MenuConfig from "../../../../core/config/MainMenuConfig";
</script>

<template>
  <div class="app-sidebar-menu overflow-hidden flex-column-fluid">
    <div
      id="kt_app_sidebar_menu_wrapper"
      class="app-sidebar-wrapper hover-scroll-overlay-y my-5"
      data-kt-scroll="true"
      data-kt-scroll-activate="true"
      data-kt-scroll-height="auto"
      data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
      data-kt-scroll-wrappers="#kt_app_sidebar_menu"
      data-kt-scroll-offset="5px"
      data-kt-scroll-save-state="true"
    >
      <div
        id="#kt_app_sidebar_menu"
        class="menu menu-column menu-rounded menu-sub-indention"
        data-kt-menu="true"
      >
        <template v-for="(item, i) in MenuConfig" :key="i">
          <div class="menu-item">
            <router-link
              class="menu-link"
              active-class="active"
              :to="item.route"
            >
              <span class="menu-icon">
                <i class="fa-solid" :class="item.icon"></i>
              </span>
              <span class="menu-title text-white">{{ item.title }}</span>
            </router-link>
          </div>
          <!-- <template v-if="menuItem.heading">
            <div class="menu-item">
              <router-link
                class="menu-link"
                active-class="active"
                :to="menuItem.route"
              >
                <span class="menu-icon">
                  <i class="fa-solid" :class="menuItem.icon"></i>
                </span>
                <span class="menu-title text-white">{{
                  menuItem.heading
                }}</span>
              </router-link>
            </div>
          </template> -->
        </template>
      </div>
    </div>
  </div>
</template>
