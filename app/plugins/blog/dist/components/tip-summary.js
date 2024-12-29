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
var tip_summary_exports = {};
__export(tip_summary_exports, {
  TipSummary: () => TipSummary
});
module.exports = __toCommonJS(tip_summary_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_lucide_react = require("lucide-react");
var import_date = require("~/shared/utils/date");
var import_button = require("~/shared/components/button");
var import_react = require("@remix-run/react");
var import_util = require("~/shared/utils/util");
const TipSummary = (props) => {
  const { tip } = props;
  let path = "";
  path && path.length > 0 ? path : "/" + path;
  path += "/tips";
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "py-4 border-gray-200", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-start justify-between", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "img",
            {
              src: "/images/football.png",
              alt: "football img",
              className: "h-6 w-6 mr-2"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-xl font-bold", children: tip.prediction.outcome.value })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_react.Link,
          {
            to: path + "/" + tip.slug,
            className: (0, import_util.cn)(
              (0, import_button.buttonVariants)({ variant: "outline", radius: "md" }),
              "text-white bg-red-400 "
            ),
            children: "See Predictions"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", { className: "text-md font-semibold", children: [
          tip.teamA,
          " vs ",
          tip.teamB
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-gray-500", children: [
          tip.leagueCountry,
          " ",
          tip.league
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-gray-500 flex items-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mr-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Calendar, { className: "h-5 w-5" }) }),
          tip.matchDate ? (0, import_date.formatDateByParts)(new Date(tip.matchDate)) : "-"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-wrap items-center gap-4 mt-2 hidden", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "inline-flex", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MessageCircleIcon, { className: "h-5 w-5 mr-2" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: " text-sm text-gray-500", children: "9 comments" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "inline-flex", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-5 w-5 mr-1", children: "\u{1F3C5}" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-gray-500", children: "2 experts" })
      ] })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TipSummary
});
//# sourceMappingURL=tip-summary.js.map
