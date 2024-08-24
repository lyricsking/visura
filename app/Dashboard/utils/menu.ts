import { config } from "@/config";
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

const userDashboardMenuItem = config.userDashboardPath;
const adminDashboardMenuItem = config.adminDashboardPath;

const userDashboardMenuItems = [
  {
    id: "default",
    label: "Dashboard",
    url: `overview`,
    icon: Package2,
  },
  {
    id: "orders",
    label: "Orders",
    url: "orders",
    icon: Package2,
  },
  {
    id: "subscriptions",
    label: "Subscription",
    url: "subscriptions",
  },
  {
    id: "invoices",
    label: "Invoices",
    url: "invoices",
  },
  {
    id: "transactions",
    label: "Transactions",
    url: "transactions",
  },
  {
    id: "settings",
    label: "Settings",
    url: "settings",
  }
];

const adminDashboardMenuItems = [
  {
    id: "default",
    label: "Dashboard",
    url: "overview",
    icon: Package2,
  },
  {
    id: "orders",
    label: "Orders",
    url: "orders",
    icon: Package2,
  },
  {
    id: "subscriptions",
    label: "Subscription",
    url: "subscriptions",
    icon: Boxes,
  },
  {
    id: "products",
    label: "Products",
    url: "products",
    icon: Box,
  },
  {
    id: "invoice",
    label: "Invoice",
    url: "invoice",
    icon: Receipt,
  },
  {
    id: "transactions",
    label: "Transactions",
    url: "transactions",
    icon: CreditCard,
  },
  {
    id: "users",
    label: "Users",
    url: "transactions",
    icon: Users,
  },

  {
    id: "settings",
    label: "Settings",
    url: "settings",
    icon: Settings,
  },
  {
    id: "support",
    label: "Support",
    url: "support",
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
