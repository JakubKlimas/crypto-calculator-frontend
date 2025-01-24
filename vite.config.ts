import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { config } from "dotenv";

config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [svgr(), react()],
  define: {
    "process.env": process.env,
  },
});
