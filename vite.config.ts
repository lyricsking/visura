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
          route("cart", "cart/layout.tsx", () => {
            route("", "cart/cart.tsx", { index: true });
            route("checkout", "cart/checkout.tsx");
          });
          route("dashboard", "dashboard/layout.tsx", () => {
            route("", "dashboard/overview.tsx", { index: true });
            route("settings", "dashboard/settings.tsx");
          });
          route("theme/update", "shared/theme/theme.action.tsx");
          route("quiz", "quiz/layout.tsx", () => {
            route("", "quiz/quiz.tsx", { index: true });
            route("confirm", "quiz/confirmation.tsx");
          });
        });
      },
    }),
    tsconfigPaths(),
  ],
});
