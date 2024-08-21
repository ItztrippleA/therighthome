import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
// https://vitejs.dev/config/
import dotenv from "dotenv";
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
  define: {
    "process.env.VITE_PAYSTACK_KEY": JSON.stringify(
      process.env.VITE_PAYSTACK_KEY
    ),
  },
});
