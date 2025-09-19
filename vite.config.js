import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Wrap lovable-tagger in a try/catch so it won't crash on Vite 7
let componentTagger;
try {
  ({ componentTagger } = require("lovable-tagger"));
} catch (err) {
  componentTagger = () => ({
    name: "noop-tagger",
  });
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    ...(mode === "development" ? [componentTagger()] : []),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // fixed alias
    },
  },
}));
