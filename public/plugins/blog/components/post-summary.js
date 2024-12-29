"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import { formatDateOrTime } from "~/shared/utils/date";
import { Link } from "@remix-run/react";
export function PostSummary(props) {
  let { post } = props;
  let dateFormat = post.publishedOn ? formatDateOrTime(new Date(post.publishedOn), {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  return /* @__PURE__ */ jsxs("article", { className: "group relative flex flex-col space-y-2", children: [
    /* @__PURE__ */ jsx(
      "img",
      {
        alt: post.title,
        width: "804",
        height: "452",
        className: "rounded-md border bg-muted transition-colors",
        src: post.featuredImage
      }
    ),
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-extrabold", children: post.title }),
    /* @__PURE__ */ jsx("p", { className: "text-muted-foreground", children: post.excerpt }),
    /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: dateFormat ?? null }),
    /* @__PURE__ */ jsx(Link, { className: "absolute inset-0", to: `/news/${post.slug}`, children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "View Article" }) })
  ] });
}
//# sourceMappingURL=post-summary.js.map
