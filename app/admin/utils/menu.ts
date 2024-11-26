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
import { UserType } from "~/core/user/models/user.model";

const userDashboardMenuItems = [
  {
    id: "default",
    label: "Dashboard",
    path: `overview`,
    icon: Package2,
  },
  {
    id: "orders",
    label: "Orders",
    path: "orders",
    icon: Package2,
  },
  {
    id: "subscriptions",
    label: "Subscription",
    path: "subscriptions",
  },
  {
    id: "invoices",
    label: "Invoices",
    path: "invoices",
  },
  {
    id: "transactions",
    label: "Transactions",
    path: "transactions",
  },
  {
    id: "settings",
    label: "Settings",
    path: "settings",
  },
];

const adminDashboardMenuItems = [
  {
    id: "default",
    label: "Dashboard",
    path: "overview",
    icon: Package2,
  },
  {
    id: "orders",
    label: "Orders",
    path: "orders",
    icon: Package2,
  },
  {
    id: "subscriptions",
    label: "Subscription",
    path: "subscriptions",
    icon: Boxes,
  },
  {
    id: "products",
    label: "Products",
    path: "products",
    icon: Box,
  },
  {
    id: "invoice",
    label: "Invoice",
    path: "invoice",
    icon: Receipt,
  },
  {
    id: "transactions",
    label: "Transactions",
    path: "transactions",
    icon: CreditCard,
  },
  {
    id: "users",
    label: "Users",
    path: "transactions",
    icon: Users,
  },

  {
    id: "settings",
    label: "Settings",
    path: "settings",
    icon: Settings,
  },
  {
    id: "support",
    label: "Support",
    path: "support",
    icon: LifeBuoy,
  },
  {
    id: "blog",
    label: "Blog",
    // path: `${config.blogPath}`,
    icon: NewspaperIcon,
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
