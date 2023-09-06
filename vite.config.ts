import { resolve } from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "reveate",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["katex", "mermaid", "reveal.js", "vitepress", "vue"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          katex: "katex",
          mermaid: "mermaid",
          vitepress: "vitepress",
          vue: "Vue",
        },
      },
    },
  },
});
