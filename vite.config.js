import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import componentTagger from "./src/lib/utils.ts";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Add these properties to open the app in Chrome
    open: true,
    browser: "chrome",
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(), // only in dev
  ].filter(Boolean),
  resolve: {
    // Setting the alias to point to the project's 'src' directory
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: path.resolve(__dirname, "./dist"), // specify output directory
  },
}));
