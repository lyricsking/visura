import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { config } from "./config";

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
        const { userDashboardPath, adminDashboardPath, blogPath } = config;

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
          route(
            userDashboardPath,
            "Dashboard/routes/layout.tsx",
            { id: "account" },
            () => {
              route("", "Dashboard/routes/user-overview.tsx", {
                index: true,
              });
              route("invoices/:status?", "Invoice/routes/invoices.tsx", () => {
                route(":id", "Invoice/routes/invoice-id.tsx", { index: true });
              });
              route("orders/:status?", "Order/routes/orders.tsx", () => {
                route(":id", "Order/routes/order-detail.tsx");
              });
              route("settings/:setting?", "Setting/routes/setting.tsx");
              route("subscriptions", "Subscription/routes/subscription.tsx");
              route("transactions", "Transaction/routes/transaction.tsx");
            }
          );
          route(
            adminDashboardPath,
            "Dashboard/routes/layout.tsx",
            { id: "admin" },
            () => {
              route("", "Dashboard/routes/admin-overview.tsx", {
                index: true,
              });
              route(blogPath, "Dashboard/routes/blog.tsx", () => {
                route("edit", "Blog/routes/new.tsx");
              });
              route("products", "Dashboard/routes/product.tsx", () => {
                route("", "Supplement/routes/products.tsx", { index: true });
                route("edit", "Supplement/routes/product-edit.tsx");
              });
              route("settings", "Setting/routes/admin-settings.tsx");
            }
          );
          route("support", "Support/routes/layout.tsx", () => {
            route("", "Support/routes/support.tsx", { index: true });
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
          route("quiz", "Quiz/routes/layout.tsx", () => {
            route("", "Quiz/routes/quiz.tsx", { index: true });
            route("question/:uid", "Quiz/routes/question.tsx");
            route("finish", "Quiz/routes/finish.tsx");
          });
          route(
            blogPath,
            "Blog/routes/layout.tsx",
            { id: "blog-layout" },
            () => {
              route("", "Blog/routes/index.tsx", { index: true });
              route("new", "Blog/routes/new.tsx", { id: "blog-new" });
              route(":slug", "Blog/routes/post.tsx");
            }
          );
          route("theme/update", "Theme/theme.action.tsx");
        });
      },
    }),
    tsconfigPaths(),
  ],
});
