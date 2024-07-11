import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// import vitePluginCssImport from "vite-plugin-css-import";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["leaflet/dist/leaflet.css"],
    },
  },
});
