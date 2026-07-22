import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Must stay absolute: nested routes such as /feedback/:slug would otherwise
  // resolve hashed assets against /feedback/ and 404.
  base: "/",
  plugins: [react()],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
  },
});
