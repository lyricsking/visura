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
var blog_admin_exports = {};
__export(blog_admin_exports, {
  default: () => BlogLayout,
  handle: () => handle
});
module.exports = __toCommonJS(blog_admin_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("@remix-run/react");
const handle = {
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
function BlogLayout() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Outlet, {}) });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handle
});
//# sourceMappingURL=blog.admin.js.map
