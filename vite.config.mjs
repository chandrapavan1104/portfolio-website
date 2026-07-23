import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { mkdir, writeFile } from "node:fs/promises";

const sitesWorker = {
  name: "sites-worker",
  async closeBundle() {
    await mkdir("dist/server", { recursive: true });
    await writeFile(
      "dist/server/index.js",
      `export default {
  async fetch(request, env) {
    const response = await env.ASSETS.fetch(request);

    if (response.status !== 404 || request.method !== "GET") {
      return response;
    }

    const indexUrl = new URL("/index.html", request.url);
    return env.ASSETS.fetch(new Request(indexUrl, request));
  },
};
`,
    );
  },
};

export default defineConfig({
  // Must stay absolute: nested routes such as /feedback/:slug would otherwise
  // resolve hashed assets against /feedback/ and 404.
  base: "/",
  plugins: [react(), sitesWorker],
  esbuild: {
    loader: "jsx",
    include: /src\/.*\.[jt]sx?$/,
  },
});
