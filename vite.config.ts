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
          route("", "Home/routes/layout.tsx", () => {
            route("", "Home/routes/index.tsx", { index: true });
          });
          route("auth", "Auth/routes/layout.tsx", () => {
            route("", "Auth/routes/signin.tsx", { index: true });
            route("signup", "Auth/routes/signup.tsx");
            route("google/callback", "Auth/routes/google-callback.tsx");
            route("google/signin", "Auth/routes/google-signin.tsx");
            route("signout", "Auth/routes/signout.tsx");
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
            route("settings/:setting?", "Dashboard/routes/settings.tsx");
            route("subscriptions", "Dashboard/routes/subscriptions.tsx");
            route("transactions", "Dashboard/routes/transactions.tsx");
          });
          route("support", "Support/routes/layout.tsx", () => {
            route("", "Support/routes/index.tsx", { index: true });
            route(
              "articles/:categoryId",
              "Support/routes/article-category.tsx"
            );
            route(
              "articles/:categoryId/article/:id",
              "Support/routes/article.tsx"
            );
          });
          route("user", "User/routes/user.resource.tsx", { id: "user" });
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
