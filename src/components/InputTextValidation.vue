<script lang="ts" setup>
import { useField, Field, ErrorMessage } from 'vee-validate';

interface Props {
  name: string;
  label: string;
  placeholder: string;
  index?: string;
  className?: string;
  disabled?: boolean;
}
const props = defineProps<Props>();

const { meta } = useField(props.name);
</script>

<template>
  <div class="fv-row mb-10">
    <label class="form-label fw-bold">{{ props.label }}</label>
    <Field
      :name="props.name"
      class="form-control form-control-lg"
      :class="[
        { 'is-invalid border-danger': meta.touched && !meta.valid },
        props.className,
      ]"
      :placeholder="props.placeholder"
      :tabindex="props.index"
      :disabled="props.disabled"
    />
    <ErrorMessage
      :name="props.name"
      class="fv-plugins-message-container invalid-feedback"
      v-if="meta.touched"
    />
  </div>
</template>
