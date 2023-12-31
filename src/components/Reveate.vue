<template>
  <button v-if="embedded" @click="toggleOverview">Vue d'ensemble</button>
  <div ref="reveal" class="reveal">
    <div class="slides">
      <slot />
    </div>
  </div>

  <span v-if="embedded">
    Appuyez sur la touche F pour passer en plein écran.
    <br />
    <a :href="printPath" target="_blank">Imprimer (sur Chrome)</a>
  </span>
</template>

<script setup lang="ts">
import type { Api } from "reveal.js";
import { computed, onBeforeMount } from "vue";
import RevealMarkdown from "reveal.js/plugin/markdown/markdown";
import RevealNotes from "reveal.js/plugin/notes/notes";
import { useData } from "vitepress";
import Mermaid from "../plugins/mermaid";
import Katex from "../plugins/katex";

const props = withDefaults(
  defineProps<{
    full?: boolean;
  }>(),
  {
    full: false,
  }
);
const { page } = useData();

const urlParams = new URLSearchParams(
  typeof window !== "undefined" ? window.location.search : undefined
);

let revealApi: Api | undefined = undefined;

const embedded = computed<boolean>(
  () => urlParams.get("print-pdf") == null && !props.full
);
const printPath = computed<string>(
  () => `/${page.value.relativePath.slice(0, -3)}-full?print-pdf`
);

onBeforeMount(() => {
  import("reveal.js").then((module) => {
    revealApi = new module.default({
      autoAnimateDuration: 0.25,
      embedded: embedded.value,
      hash: true,
      pdfMaxPagesPerSlide: 1,
      pdfSeparateFragments: false,
      plugins: [Katex, Mermaid, RevealMarkdown, RevealNotes],
      slideNumber: true,
      transition: "fade",
      transitionSpeed: "fast",
    });
    revealApi.initialize();
  });
});

function toggleOverview() {
  revealApi?.toggleOverview();
}
</script>
