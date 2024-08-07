import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  resolve: {
    alias: {
      // Make sure Leaflet resolves properly
      leaflet: "leaflet",
    },
  },
  build: {
    rollupOptions: {
      external: ["/leaflet/dist/leaflet.css"],
    },
  },
});
