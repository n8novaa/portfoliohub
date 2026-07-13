import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("@paper-design")) return "shaders";
            if (id.includes("framer-motion")) return "framer";
            if (id.includes("react-vertical-timeline")) return "timeline";
            if (id.includes("react-dom") || id.includes("react-router")) return "react-vendor";
          }
        },
      },
    },
  },
});
