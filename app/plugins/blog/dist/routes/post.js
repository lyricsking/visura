"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_exports = {};
__export(post_exports, {
  default: () => Post
});
module.exports = __toCommonJS(post_exports);
var import_react_markdown = __toESM(require("react-markdown"), 1);
var import_date = require("~/shared/utils/date");
var import_jsx_runtime = require("react/jsx-runtime");
function Post({ post }) {
  let publishedOn = post.publishedOn ? (0, import_date.formatDateOrTime)(new Date(post.publishedOn), {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "max-w-3xl mx-auto px-4 md:py-8 md:px-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-4", children: [
      publishedOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-gray-500", children: [
        "Published on ",
        publishedOn
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-5xl break-words font-bold mt-1", children: post.title }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center mt-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src: "author-image-url",
            alt: " author",
            className: "w-12 h-12 rounded-full"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "ml-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-semibold", children: "Jamiu" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-gray-500", children: "@jamiu" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "img",
        {
          src: post.featuredImage,
          alt: post.title,
          className: "w-full h-auto border rounded-lg mb-6"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "prose md:prose-lg lg:prose-xl", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_markdown.default, { children: post.content }) })
    ] })
  ] });
}
//# sourceMappingURL=post.js.map
