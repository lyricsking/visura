import { config } from "@/config";
import { Outlet } from "@remix-run/react";

export const handle = {
  pageName: "Blog",
  submenu: [
    {
      path: `${config.blogPath}`,
      label: "Blog",
    },
    {
      path: `${config.blogPath}/edit`,
      label: "New",
    },
    {
      path: `${config.blogPath}/edit`,
      label: "Edit",
    },
    {
      path: `${config.blogPath}/edit`,
      label: "Some other",
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
