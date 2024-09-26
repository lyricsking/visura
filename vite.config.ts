import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import routes from "./app/routes";
import esbuild from "esbuild";

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
        return defineRoutes(routes);
      },
      future: {
        v3_fetcherPersist: true,
        v3_relativeSplatPath: true,
        v3_throwAbortReason: true,
      },
      serverBuildFile: "remix.js",
      buildEnd: async () => {
        await esbuild
          .build({
            alias: { "~": "./app" },
            outfile: "build/server/index.js",
            entryPoints: ["server/index.ts"],
            external: ["./build/server/*"],
            platform: "node",
            format: "esm",
            packages: "external",
            bundle: true,
            logLevel: "info",
          })
          .catch((error: unknown) => {
            console.error("Error building server:", error);
            process.exit(1);
          });
      },
    }),
    tsconfigPaths(),
  ],
  optimizeDeps: {
    exclude: ["@mapbox"], // Mapbox lib causing error during build time.
  },
});
