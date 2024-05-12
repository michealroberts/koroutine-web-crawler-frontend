<script setup lang="ts">
import { ref, watch } from "vue";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";

import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

import { type Option } from "./props";

const props = defineProps<{
  options: Option[];
  optionPrefix?: string;
  initialOption?: Option;
}>();

const emit = defineEmits<{
  (event: "update:selectedOption", option: Option): void;
}>();

// Ref to hold the selected option, defaulting to the initialOption or a fallback:
const selectedOption = ref<Option>(
  props.initialOption || {
    value: "Value",
    name: "Name",
  }
);

// Watch for external changes to initialOption and update the local state accordingly:
watch(
  () => props.initialOption,
  (newValue) => {
    if (newValue) {
      selectedOption.value = newValue;
    }
  },
  { immediate: true }
);

// Emit the selected option change:
watch(
  selectedOption,
  (newVal) => {
    emit("update:selectedOption", newVal);
  },
  { deep: true }
);
</script>

<template>
  <div class="w-full relative">
    <Listbox v-model="selectedOption">
      <ListboxButton
        class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-cyan-300 sm:text-sm"
      >
        <span class="block truncate">
          {{ optionPrefix }} {{ selectedOption.name }}
        </span>
        <span
          class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
        >
          <ChevronUpDownIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions
          class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm list-none pl-0"
        >
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="option in options"
            :key="option.name"
            :value="option"
            as="template"
          >
            <li
              :class="[
                active ? 'bg-cyan-100 text-cyan-900' : 'text-gray-900',
                'relative cursor-default select-none py-2 pl-10 pr-4',
              ]"
            >
              <span
                :class="[
                  selected ? 'font-medium' : 'font-normal',
                  'block truncate',
                ]"
              >
                {{ option.name }}
              </span>
              <span
                v-if="selected"
                class="absolute inset-y-0 left-0 flex items-center pl-3 text-cyan-600"
              >
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </Listbox>
  </div>
</template>
