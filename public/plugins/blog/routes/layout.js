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
var layout_exports = {};
__export(layout_exports, {
  default: () => Layout
});
module.exports = __toCommonJS(layout_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("@remix-run/react");
var import_footer = __toESM(require("~/shared/components/ui/footer"), 1);
var import_page = require("~/shared/components/ui/page.layout");
var import_button = __toESM(require("~/shared/components/button"), 1);
function Layout() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_page.PageLayout, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_page.PageLayoutHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_page.PageLayoutHeaderItem, { spacing: "compact", className: "bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Link, { to: "/", replace: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-2xl font-bold tracking-tight", children: "app name" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_button.default, { variant: "outline", className: " hidden bg-gray-100", radius: "md", children: "Login" })
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_page.PageLayoutContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Outlet, {}) }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_page.PageLayoutFooter, { columns: "1", asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_footer.default, {}) })
  ] });
}
//# sourceMappingURL=layout.js.map
