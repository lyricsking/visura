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
          route("cart", "Order/routes/layout.tsx", () => {
            route("", "Order/routes/cart.tsx", { index: true });
            route("shipping", "Order/routes/shipping.tsx");
            route("payment", "Order/routes/payment.tsx");
          });
          route("dashboard", "Dashboard/routes/layout.tsx", () => {
            route("", "Dashboard/routes/overview.tsx", { index: true });
            route("invoices/:status?", "Dashboard/routes/invoices.tsx", () => {
              route(":id", "Dashboard/routes/invoice-id.tsx", { index: true });
            });
            route("orders/:status?", "Dashboard/routes/orders.tsx", () => {
              route(":id", "Dashboard/routes/order-detail.tsx");
            });
            route("profile", "Dashboard/routes/profile.tsx");
            route("settings/:screen?", "Dashboard/routes/settings.tsx");
            route("subscriptions", "Dashboard/routes/subscriptions.tsx");
            route("transactions", "Dashboard/routes/transactions.tsx");
          });
          route("support", "Support/routes/index.tsx", () => {
            route("articles", "Support/routes/article-category.tsx");
            route("articles/:id", "Support/routes/article.tsx");
          });
          route("quiz", "Quiz/layout.tsx", () => {
            route("", "Quiz/index.tsx", { index: true });
          });
          route("theme/update", "Theme/theme.action.tsx");
        });
      },
    }),
    tsconfigPaths(),
  ],
});
