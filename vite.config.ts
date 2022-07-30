import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    // https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      output: {},
    },
  },
});
