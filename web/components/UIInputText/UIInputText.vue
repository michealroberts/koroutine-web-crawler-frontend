<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { type Validation } from "./props";

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    validation?: Validation;
  }>(),
  {
    placeholder: "Search...",
    validation: (value: string) => new RegExp(/.*/).test(value), // default regex matching any string
  }
);

const emit = defineEmits<{
  (event: "update:selectedValue", value: string): void;
}>();

const selectedValue = ref("");

// Emit the selected option change:
watch(
  selectedValue,
  (newValue) => {
    if (!isSelectedValueValid.value) {
      return emit("update:selectedValue", "");
    }

    return emit("update:selectedValue", newValue);
  },
  { deep: true }
);

const isSelectedValueValid = computed((): boolean => {
  return props.validation(selectedValue.value);
});
</script>

<template>
  <div class="w-full relative">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="selectedValue"
      class="w-auto w-full mx-auto cursor-default rounded-lg bg-white py-2 pl-4 pr-10 text-left shadow-md border-box focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 sm:text-sm"
    />
  </div>
</template>
