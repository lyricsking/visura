import { DefineRouteFunction } from "@react-router/dev/dist/config/routes";
import { IPlugin } from "../../core/plugin";
import { Menu } from "~/utils/menu";
import { PluginSettingsType } from "~/core/config";
import {
  Package2,
  Boxes,
  Box,
  Receipt,
  CreditCard,
  Users,
  Settings,
  LifeBuoy,
  NewspaperIcon,
} from "lucide-react";

const dashboardPlugin: IPlugin = {
  name: "dashboard",
  description: "",
  version: "0.0.1",
  defaultConfig: {
    path: "dashboard",
  },
  dashboardMenu: [
    {
      id: "default",
      label: "Dashboard",
      path: "",
      icon: Package2,
    },
  ],
  registerRoutes: (
    defineRoute: DefineRouteFunction,
    config: PluginSettingsType
  ) => {
    defineRoute(config.path, "plugins/dashboard/layouts/Main.tsx", () => {
      defineRoute("", "plugins/dashboard/layouts/User.tsx", () => {
        defineRoute("", "plugins/dashboard/routes/user-overview.tsx", {
          index: true,
        });
      });
      defineRoute();
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

declare module "~/core/plugin" {
  export interface IPlugin {
    defaultConfig: PluginSettingsType & { adminPath: string };
    dashboardMenu?: (Menu & {
      element: React.ReactNode;
    })[];
  }
}
