import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "::",
    port: "8080",
    strictPort: true,
    clearScreen: false,
    logLevel: "info",
    warmup: {
      clientFiles: ["src/**/*.(js|jsx|ts|tsx|html|css)", "index.html"]
    },
  },
  plugins: [react()],
  base: ""
});
