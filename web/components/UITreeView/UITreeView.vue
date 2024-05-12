<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";

import { ChevronUpIcon } from "@heroicons/vue/20/solid";

import UITreeView from "./UITreeView.vue";

import { type Node } from "./props";

defineProps<{
  root: Node;
}>();
</script>

<template>
  <div class="mx-auto w-full rounded-lg bg-white p-1" v-if="root && root.name">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between rounded-lg bg-cyan-100 px-4 py-2 text-left text-sm font-medium text-cyan-900 hover:bg-cyan-200 focus:outline-none focus-visible:ring focus-visible:ring-cyan-500/75"
      >
        <span>{{ root.name }}</span>
        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5 text-cyan-500"
        />
      </DisclosureButton>
      <DisclosurePanel class="p-4 py-1 pr-0 text-sm text-gray-500">
        <UITreeView
          v-if="root.children && root.children.length"
          v-for="(child, index) in root.children"
          :key="index"
          :root="child"
        />
        <div v-else>Empty node</div>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
