import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { port: 5173, open: true, watch: { usePolling: true, interval: 300 } },
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        dashboard: "./dashboard.html",
      },
    },
  },
});
