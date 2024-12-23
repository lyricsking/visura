import { LoaderFunctionArgs, json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { loadConfigFromFile } from "vite";
import { findPosts } from "../../server/post.server";

export const handle = {
  pageName: "Blog",
  submenu: [
    {
      path: ``,
      label: "Blog",
    },
    {
      path: `edit`,
      label: "New",
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
