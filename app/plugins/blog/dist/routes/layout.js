"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import { Link, Outlet } from "@remix-run/react";
import Footer from "~/shared/components/ui/footer";
import {
  PageLayout,
  PageLayoutContent,
  PageLayoutFooter,
  PageLayoutHeader,
  PageLayoutHeaderItem
} from "~/shared/components/ui/page.layout";
import Button from "~/shared/components/button";
export default function Layout() {
  return /* @__PURE__ */ jsxs(PageLayout, { children: [
    /* @__PURE__ */ jsx(PageLayoutHeader, { children: /* @__PURE__ */ jsxs(PageLayoutHeaderItem, { spacing: "compact", className: "bg-white", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", replace: true, children: /* @__PURE__ */ jsx("h1", { className: "text-2xl font-bold tracking-tight", children: "app name" }) }),
      /* @__PURE__ */ jsx(Button, { variant: "outline", className: " hidden bg-gray-100", radius: "md", children: "Login" })
    ] }) }),
    /* @__PURE__ */ jsx(PageLayoutContent, { children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(PageLayoutFooter, { columns: "1", asChild: true, children: /* @__PURE__ */ jsx(Footer, {}) })
  ] });
}
//# sourceMappingURL=layout.js.map
