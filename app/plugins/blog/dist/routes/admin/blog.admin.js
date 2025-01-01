"use strict";
import { jsx } from "react/jsx-runtime";
import { Outlet } from "@remix-run/react";
export const handle = {
  pageName: "Blog",
  submenu: [
    {
      path: ``,
      label: "Blog"
    },
    {
      path: `edit`,
      label: "New"
    }
  ]
};
export default function BlogLayout() {
  return /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(Outlet, {}) });
}
