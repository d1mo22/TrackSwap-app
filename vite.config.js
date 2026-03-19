import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [react()],
	server: {
		port: 5173,
		open: true,
		watch: {
			usePolling: true,
			interval: 300,
		},
	},
});
