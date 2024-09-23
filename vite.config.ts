import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import routes from "./app/route";

installGlobals();

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    tsconfigPaths(),
    remix({
      ignoredRouteFiles: ["**/.*"],
      // appDirectory: "app",
      // assetsBuildDirectory: "public/build",
      // publicPath: "/build/",
      // serverBuildPath: "build/index.js",
      routes(defineRoutes) {
        return defineRoutes(routes);
      },
    }),
  ],
  optimizeDeps: {
    exclude: ["@mapbox"], // Mapbox lib causing error during build time.
  },
});
