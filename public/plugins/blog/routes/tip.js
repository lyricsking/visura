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
var tip_exports = {};
__export(tip_exports, {
  default: () => TipPage
});
module.exports = __toCommonJS(tip_exports);
var import_react_markdown = __toESM(require("react-markdown"), 1);
var import_date = require("~/shared/utils/date");
var import_card = require("~/shared/components/card");
var import_jsx_runtime = require("react/jsx-runtime");
function TipPage({ tip }) {
  let title = tip.teamA + " - " + tip.teamB;
  let publishedOn = tip.publishedOn ? (0, import_date.formatDateOrTime)(new Date(tip.publishedOn), {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  const matchDate = (0, import_date.formatDateOrTime)(new Date(tip.matchDate), {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { className: "w-full mx-auto max-w-3xl px-4 md:py-8 md:px-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col p-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-gray-500", children: [
        "Published on ",
        publishedOn
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-5xl break-words font-bold mt-1", children: title }),
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
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { className: "w-full bg-gray-50/90 shadow-md overflow-hidden mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.CardHeader, { className: "justify-center border-b py-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full grid grid-cols-[30%_1fr] gap-4 font-semibold", children: [
            "Match Date:",
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "w-full font-normal", children: matchDate })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xl font-bold text-center", children: [
            tip.leagueCountry,
            " - ",
            tip.league
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardContent, { className: "py-6 px-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-[30%_1fr_30%] gap-4 items-center md:gap-6 text-center mb-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-semibold", children: tip.teamA }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 font-semibold gap-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { children: "League position" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex justify-center space-x-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 border-l-2 border-green-500" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-green-500 text-black text-xl font-bold p-2 rounded", children: tip.teamARank }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 border-l-2 border-green-500" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 border-l-2 border-red-500" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-red-500 text-black text-xl font-bold p-2 rounded", children: tip.teamBRank }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 border-l-2 border-red-500" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-semibold", children: tip.teamB })
        ] }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "prose md:prose-lg lg:prose-xl mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "text-2xl font-semibold", children: "Match Preview" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_markdown.default, { children: tip.introduction })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mb-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", { className: "text-2xl font-semibold", children: "Match Predictions" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid gap-6", children: Object.keys(tip.prediction).map((key) => {
          return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", { className: "p-4 my-4 border-s-4 border-gray-300 bg-gray-50 rounded-md", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-2xl capitalize italic font-semibold text-gray-900 dark:text-white mb-6", children: [
              key,
              ":"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xl italic font-medium leading-relaxed text-gray-900 dark:text-white", children: '"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."' })
          ] });
        }) })
      ] })
    ] })
  ] });
}
//# sourceMappingURL=tip.js.map
