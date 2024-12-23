import { Outlet } from "react-router";
import { config } from "@/config";

export const handle = {
  pageName: "Blog",
  submenu: [
    {
      path: `products`,
      label: "Products",
    },
  ],
};

export default function BlogLayout() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
