import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "./app/config";
import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import defineAppRoutes from "~/core/route";

installGlobals();

export default defineConfig({
  server: { port: 3000 },
  plugins: [
    remix({
      ignoredRouteFiles: ["**/.*"],
      // appDirectory: "app",
      // assetsBuildDirectory: "public/build",
      // publicPath: "/build/",
      // serverBuildPath: "build/index.js",
      routes(defineRoutes) {

        return defineRoutes((route) => {
          defineAppRoutes(route);
          
        });
      },
    }),
    tsconfigPaths(),
  ],
});

