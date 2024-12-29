"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_summary_exports = {};
__export(post_summary_exports, {
  PostSummary: () => PostSummary
});
module.exports = __toCommonJS(post_summary_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_date = require("~/shared/utils/date");
var import_react = require("@remix-run/react");
function PostSummary(props) {
  let { post } = props;
  let dateFormat = post.publishedOn ? (0, import_date.formatDateOrTime)(new Date(post.publishedOn), {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "group relative flex flex-col space-y-2", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "img",
      {
        alt: post.title,
        width: "804",
        height: "452",
        className: "rounded-md border bg-muted transition-colors",
        src: post.featuredImage
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-2xl font-extrabold", children: post.title }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-muted-foreground", children: post.excerpt }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground", children: dateFormat ?? null }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Link, { className: "absolute inset-0", to: `/news/${post.slug}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: "View Article" }) })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PostSummary
});
//# sourceMappingURL=post-summary.js.map
