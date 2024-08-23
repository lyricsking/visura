import {
  Package2,
  Boxes,
  Box,
  Receipt,
  CreditCard,
  Users,
  Settings,
  LifeBuoy,
} from "lucide-react";
import { UserType } from "~/User/types/user.types";

const userDashboardMenuItems = [
  {
    id: "default",
    label: "Dashboard",
    url: "/account/overview",
    icon: Package2,
  },
  {
    id: "orders",
    label: "Orders",
    url: "/dashboard/orders",
    icon: Package2,
  },
  {
    id: "subscriptions",
    label: "Subscription",
    url: "/dashboard/subscriptions",
  },
  {
    id: "invoices",
    label: "Invoices",
    url: "/dashboard/invoices",
  },
  {
    id: "transactions",
    label: "Transactions",
    url: "/dashboard/transactions",
  },
  {
    id: "settings",
    label: "Settings",
    url: "/dashboard/settings",
  },
  {
    id: "support",
    label: "Support",
    url: "/support",
  },
];

const adminDashboardMenuItems = [
  {
    id: "default",
    label: "Dashboard",
    url: "/administration/overview",
    icon: Package2,
  },
  {
    id: "orders",
    label: "Orders",
    url: "/dashboard/orders",
    icon: Package2,
  },
  {
    id: "subscriptions",
    label: "Subscription",
    url: "/dashboard/subscriptions",
    icon: Boxes,
  },
  {
    id: "products",
    label: "Products",
    url: "/dashboard/products",
    icon: Box,
  },
  {
    id: "invoice",
    label: "Invoice",
    url: "/dashboard/invoice",
    icon: Receipt,
  },
  {
    id: "transactions",
    label: "Transactions",
    url: "/dashboard/transactions",
    icon: CreditCard,
  },
  {
    id: "users",
    label: "Users",
    url: "/dashboard/transactions",
    icon: Users,
  },

  {
    id: "settings",
    label: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
  {
    id: "support",
    label: "Support",
    url: "/support",
    icon: LifeBuoy,
  },
];

export const dashboardMenuFor = (userType: UserType) => {
  if (userType === UserType.staff) {
    return adminDashboardMenuItems;
  } else if (userType === UserType.customer) {
    return userDashboardMenuItems;
  } else {
    return [];
  }
};
