import { index, type RouteConfig } from "@remix-run/route-config";
import { remixRoutesOptionAdapter } from "@remix-run/routes-option-adapter";

export default [
  ...(await remixRoutesOptionAdapter((defineRoutes) => {
    return defineRoutes((route) => {
      // Define all static routes first
      // Auth routes
      route("auth", "auth/routes/layout.tsx", () => {
        index("auth/routes/signin.tsx");
        route("signup", "auth/routes/signup.tsx");
        route("google", "auth/routes/google-signin.tsx");
        route("google/callback", "auth/routes/google-callback.tsx");
        route("signout", "auth/routes/signout.tsx");
      });

      // Admin routes
      route("administration", "admin/routes/layout.tsx", () => {
        route("", "admin/routes/overview.tsx", { index: true });
        route("pages", "admin/routes/pages.tsx");
        route("pages/edit/:pageId", "admin/routes/page-editor.tsx", {
          id: "edit-page",
        });
        route("pages/create/:templateId?", "admin/routes/page-editor.tsx", {
          id: "create-page",
        });
        route("users", "admin/routes/users.tsx");
        route(
          "settings",
          "admin/routes/settings.tsx",
          { id: "setting" },
          () => {
            route("general", "admin/routes/general-settings.tsx", {
              index: true,
            });
            route("display", "admin/routes/display-settings.tsx");
            route("policy", "admin/routes/privacy-settings.tsx");
          }
        );
        route("*", "admin/routes/catch-all.tsx");
      });

      // Public pages, registered last so that catch all route would match non handle routes only.
      route("/", "public/routes/layout.tsx", () => {
        route("", "public/routes/home.tsx", { index: true });
        route("*", "public/routes/catch-all.tsx");
      });

      // Api routes
      route("api/options", "option/routes/api/options.server.ts");
      route("api/pages", "page/routes/api/pages.server.ts");
      route("api/plugins", "plugin/routes/api/plugins.server.ts");
    });
  })),
] satisfies RouteConfig;

const defaultRoutes = () => {
  // route("cart", "Order/routes/layout.tsx", () => {
  //   route("", "Order/routes/cart.tsx", { index: true });
  //   route("shipping", "Order/routes/shipping.tsx");
  //   route("payment", "Order/routes/payment.tsx");
  // });
  // route("", "Dashboard/routes/layout.tsx", () => {
  //   // route(
  //   //   userDashboardPath,
  //   //   "Dashboard/routes/layout.tsx",
  //   //   { id: "account" },
  //   //   () => {
  //   //     route("", "Dashboard/routes/user-overview.tsx", {
  //   //       index: true,
  //   //     });
  //   //     route(
  //   //       "invoices/:status?",
  //   //       "Invoice/routes/invoices.tsx",
  //   //       () => {
  //   //         route(":id", "Invoice/routes/invoice-id.tsx", {
  //   //           index: true,
  //   //         });
  //   //       }
  //   //     );
  //   //     route("orders/:status?", "Order/routes/orders.tsx", () => {
  //   //       route(":id", "Order/routes/order-detail.tsx");
  //   //     });
  //   //     route("settings/:setting?", "Setting/routes/setting.tsx");
  //   //     route("subscriptions", "Subscription/routes/subscription.tsx");
  //   //     route("transactions", "Transaction/routes/transaction.tsx");
  //   //   }
  //   // );
  //   // route(
  //   //   adminDashboardPath,
  //   //   "Dashboard/routes/layout.admin.tsx",
  //   //   { id: "admin" },
  //   //   () => {
  //   //     route("", "Dashboard/routes/overview.admin.tsx", {
  //   //       index: true,
  //   //     });
  //   //     route(blogPath, "Blog/routes/blog.admin.tsx", () => {
  //   //       route("", "Blog/routes/posts.admin.tsx", {
  //   //         index: true,
  //   //       });
  //   //       route("edit", "Blog/routes/edit.tsx");
  //   //     });
  //   //     route("products", "Product/routes/product.admin.tsx", () => {
  //   //       route("", "Product/routes/products.tsx", { index: true });
  //   //       route("edit", "Product/routes/product-edit.tsx");
  //   //     });
  //   //     route("settings", "Setting/routes/admin-settings.tsx");
  //   //     route("upload", "Dashboard/routes/upload.tsx");
  //   //   }
  //   // );
  // });
  // route("support", "Support/routes/layout.tsx", () => {
  //   route("", "Support/routes/support.tsx", { index: true });
  //   route("articles/:categoryId", "Support/routes/article-category.tsx");
  //   route("articles/:categoryId/article/:id", "Support/routes/article.tsx");
  // });
  // route("user", "User/routes/user.resource.tsx", { id: "user" });
  // route("quiz", "Quiz/routes/layout.tsx", () => {
  //   route("", "Quiz/routes/quiz.tsx", { index: true });
  //   route("question/:uid", "Quiz/routes/question.tsx");
  //   route("finish", "Quiz/routes/finish.tsx");
  // });
  // // route(blogPath, "Blog/routes/layout.tsx", { id: "blog-layout" }, () => {
  // //   route("", "Blog/routes/index.tsx", { index: true });
  // //   // route("new", "Blog/routes/edit.tsx", { id: "blog-new" });
  // //   route(":slug", "Blog/routes/post.tsx");
  // //   route("upload", "Dashboard/routes/upload.tsx", {
  // //     id: "upload-blog",
  // //   });
  // // });
  // route("theme/update", "Theme/theme.action.tsx");
};
