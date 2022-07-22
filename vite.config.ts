import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), visualizer()],
  build: {
    // https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      treeshake: "recommended",
      output: {
        compact: true,
        // manualChunks(id) {
        //   if (id.includes("firebase")) {
        //     // chunk firebase modules seperately
        //     return "firebase";
        //   } else if (id.includes("react")) {
        //     // chunk the rest of the modules and internal source together
        //     return "react";
        //   }
        // },
      },
    },
  },
});
