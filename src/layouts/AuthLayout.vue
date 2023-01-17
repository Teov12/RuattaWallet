<template>
  <div
        class="d-flex flex-column flex-lg-row-fluid w-lg-50 p-10 order-2 order-lg-1"
      >
        <div class="d-flex flex-center flex-column flex-lg-row-fluid">
          <div class="w-lg-500px p-10">
            <RouterView v-slot="{ Component, route }">
              <Transition
                enter-active-class="animate__animated animate__fadeIn animate__faster"
                leave-active-class="animate__animated animate__fadeOut animate__faster"
                mode="out-in"
              >
                <div :key="route.fullPath">
                  <component :is="Component"></component>
                </div>
              </Transition>
            </RouterView>
          </div>
        </div>
      </div>
</template>
