<script lang="ts" setup>
interface Props {
  msg: string;
  image?: string;
  className?: string;
}
const props = defineProps<Props>();
</script>

<template>
  <div
    class="d-flex justify-content-center align-items-center"
    :class="props.className"
  >
    <div class="text-center">
      <img
        v-if="props.image"
        class="mb-10"
        src="/media/weve/logos/logo-primary.svg"
        alt=""
      />
      <h1 class="mb-10">{{ props.msg }}</h1>
      <div class="lds-dual-ring"></div>
    </div>
  </div>
</template>

<style scoped>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #3dbdff;
  border-color: #3dbdff transparent #3dbdff transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
