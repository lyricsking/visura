import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { envOnlyMacros } from "vite-env-only";

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    reactRouter({
      ignoredRouteFiles: ["**/.*"],
      // appDirectory: "app",
      // assetsBuildDirectory: "public/build",
      // publicPath: "/build/",
      // serverBuildPath: "build/index.js",
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
        v3_lazyRouteDiscovery: true,
        v3_singleFetch: true,
        v3_routeConfig: true,
      },
    }),
    tsconfigPaths(),
    envOnlyMacros(),
  ],
  optimizeDeps: {
    exclude: ["@mapbox"], // Mapbox lib causing error during build time.
  },
});

declare module "@remix-run/server-runtime" {
  interface Future {
    v3_singleFetch: true;
  }
}
