<script setup lang="ts">
import { useEventSource } from "@vueuse/core";

import { type Option } from "./components/UIListboxDropdown/props";

import { type Validation } from "./components/UIInputText/props";

import { type Node as TreeNode } from "./components/UITreeView/props";

import { type URLNode, isURLNode } from "./domain/urlNode";

const config = useRuntimeConfig();

const maxDepth = ref(1);

const maxDepthValueOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] satisfies number[];

const maxDepthOptions = maxDepthValueOptions.map((i) => ({
  name: `${i}`,
  value: `${i}`,
})) satisfies Option[];

const handleMaxDepthSelection = (option: Option) => {
  maxDepth.value = parseInt(option.value);
};

const domain = ref("");

// This regex will validate a domain but not a URL:
const validDomainRegex = /^(https?:\/\/)?([\da-z\.-]+\.)+([a-z\.]{2,6})$/;

const domainValidation: Validation = (value: string) => {
  let url: URL | null = null;

  try {
    url = new URL(value);
  } catch (e) {
    return false;
  }

  if (!url) return false;

  // Check that we do have a protocol and that it is either http or https:
  return (
    new RegExp(validDomainRegex).test(value) &&
    (url.protocol === "http:" || url.protocol === "https:") &&
    url.pathname === "/" &&
    url.search === "" &&
    url.hash === ""
  );
};

const handleDomainSelection = (value: string) => {
  domain.value = value;
};

const urlSearchParams = computed(() => {
  // Here, when the domain is empty, we return an empty object:
  if (!domain.value) return new URLSearchParams();

  if (maxDepth.value < 1) return new URLSearchParams();

  return new URLSearchParams({
    domain: domain.value,
    depth: maxDepth.value.toString(),
  });
});

const url = computed(() => {
  return `${config.public.crawler.apiBaseUrl}/crawl?${urlSearchParams.value}`;
});

const isReady = computed(() => {
  return (
    !!domain.value &&
    maxDepth.value > 0 &&
    domainValidation(domain.value) &&
    urlSearchParams.value.toString() !== ""
  );
});

const { data } = useEventSource(
  computed(() => {
    return isReady.value ? url.value : undefined;
  })
);

const parseDataToJSON = (unparsedData: string): URLNode => {
  const data = JSON.parse(unparsedData);

  // Check to see if each node in the data is a URLNode:
  if (!isURLNode(data)) {
    throw new Error("Data is not a URLNode");
  }

  return data as URLNode;
};

// Convert the URLNode to a TreeNode:
const convertURLNodeToTreeNode = (node: URLNode): TreeNode => {
  return {
    name: node.url,
    children: node.links?.map(convertURLNodeToTreeNode),
  };
};

const nodes = computed((): TreeNode => {
  if (!data.value) {
    return {
      name: "Empty",
      children: [] as TreeNode[],
    };
  }

  const root = parseDataToJSON(data.value);

  return convertURLNodeToTreeNode(root);
});
</script>

<template>
  <div
    class="h-dvh w-full bg-gradient-to-r from-cyan-500 to-blue-500 dark:bg-cyan-800 p-4 md:p-8 md:py-16 space-y-4 overflow-y-scroll"
  >
    <div
      class="grid grid-cols-1 lg:grid-cols-6 gap-y-3 lg:gap-y-0 lg:gap-x-3 mx-auto max-w-screen-sm lg:max-w-screen-md"
    >
      <div class="md:col-span-4">
        <UIInputText
          placeholder="Search a domain..."
          :validation="domainValidation"
          @update:selectedValue="handleDomainSelection"
        />
      </div>
      <div class="md:col-span-2">
        <UIListboxDropdown
          :options="maxDepthOptions"
          :initialOption="maxDepthOptions[0]"
          :optionPrefix="'Max Depth: '"
          @update:selectedOption="handleMaxDepthSelection"
        />
      </div>
    </div>
    <div
      v-if="isReady && nodes.children.length > 0"
      class="grid grid-cols-1 gap-y-3 lg:gap-y-0 lg:gap-x-3 mx-auto max-w-screen-sm lg:max-w-screen-md"
    >
      <UITreeView :root="nodes" />
    </div>
  </div>
</template>

<style lang="css">
@import url("@unocss/reset/tailwind-compat.css");

* {
  font-family: "Inter", sans-serif;
}

body {
  margin: 0;
  padding: 0;
}
</style>
