import { DefineRouteFunction } from "@remix-run/dev/dist/config/routes";
import { IPlugin } from "../../core/plugin";
import { PluginSettingsType } from "~/config";

const dashboardPath = "dashboard";

const dashboardPlugin: IPlugin<PluginSettingsType> = {
  name: "dashboard",
  description: "",
  version: "0.0.1",
  defaultConfig: {
    path: dashboardPath,
  },
  registerRoutes: (
    defineRoute: DefineRouteFunction,
    config: PluginSettingsType
  ) => {
    defineRoute(config.path, "plugins/dashboard/layouts/dashboard.tsx", () => {
      defineRoute("", "plugins/dashboard/routes/user-overview.tsx", {
        index: true,
      });
      //   //   defineRoute(
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
    });
  },
};

export default dashboardPlugin;
