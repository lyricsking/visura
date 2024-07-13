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
          route("", "home/layout.tsx", () => {
            route("", "home/index.tsx", { index: true });
          });
          route("auth", "auth/layout.tsx", () => {
            route("signin", "auth/signin.tsx");
            route("signup", "auth/signup.tsx");
          });
          route("order", "order/route/layout.tsx", () => {
            route("", "order/route/index.tsx", { index: true });
            route("checkout", "order/route/checkout.tsx");
            route("shipping", "order/route/shipping.tsx");
            route("payment", "order/route/payment.tsx");
            route("confirm", "order/route/confirm.tsx");
          });
          route("dashboard", "dashboard/layout.tsx", () => {
            route("", "dashboard/overview.tsx", { index: true });
            route("settings", "dashboard/settings.tsx");
          });
          route("theme/update", "shared/theme/theme.action.tsx");
          route("quiz", "quiz/layout.tsx", () => {
            route("", "quiz/index.tsx", { index: true });
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
