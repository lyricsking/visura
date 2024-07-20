import { TriangleUpIcon } from "@radix-ui/react-icons";
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
            route("", "Auth/route/signin.tsx", { index: true });
            route("signup", "Auth/route/signup.tsx");
            route("google/callback", "Auth/route/google-callback.tsx");
            route("google/login", "Auth/route/google-login.tsx");
          });
          route("cart", "Order/route/layout.tsx", () => {
            route("", "Order/route/index.tsx", { index: true });
            route("shipping", "Order/route/shipping.tsx");
            route("payment", "Order/route/payment.tsx");
          });
          route("dashboard", "Dashboard/routes/layout.tsx", () => {
            route("", "Dashboard/routes/overview.tsx", { index: true });
            route("settings", "Dashboard/roures/settings.tsx");
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
