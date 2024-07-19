import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

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
          route("", "Home/layout.tsx", () => {
            route("", "Home/index.tsx", { index: true });
          });
          route("auth", "Auth/route/layout.tsx", () => {
            route("signin", "Auth/route/signin.tsx");
            route("signup", "Auth/route/signup.tsx");
          });
          route("cart", "Order/route/layout.tsx", () => {
            route("", "Order/route/index.tsx", { index: true });
            route("shipping", "Order/route/shipping.tsx");
            route("payment", "Order/route/payment.tsx");
          });
          route("dashboard", "Dashboard/layout.tsx", () => {
            route("", "Dashboard/overview.tsx", { index: true });
            route("settings", "Dashboard/settings.tsx");
          });
          route("theme/update", "Shared/theme/theme.action.tsx");
          route("quiz", "Quiz/layout.tsx", () => {
            route("", "Quiz/index.tsx", { index: true });
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
