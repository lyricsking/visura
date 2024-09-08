import { config } from "@/config";
import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { loadConfigFromFile } from "vite";
import { findPosts } from "../server/post.server";

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
    <div className="">
      <Outlet />
    </div>
  );
}
