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
var blog_exports = {};
__export(blog_exports, {
  blogLoader: () => blogLoader,
  default: () => Blog,
  links: () => links,
  meta: () => meta
});
module.exports = __toCommonJS(blog_exports);
var import_lucide_react = require("lucide-react");
var import_post_summary = require("../components/post-summary");
var import_fonts = require("~/shared/utils/fonts");
var import_react_scroll_area = require("@radix-ui/react-scroll-area");
var import_react_select = require("@radix-ui/react-select");
var import_macros = require("vite-env-only/macros");
var import_tip_card = require("../components/tip-card");
var import_post = require("../server/post.server");
var import_tips = require("../server/tips.server");
var import_card = require("~/client/components/card");
var import_core = require("@mantine/core");
var import_jsx_runtime = require("react/jsx-runtime");
const blogLoader = (0, import_macros.serverOnly$)(
  async () => {
    const [tips, posts] = await Promise.all([
      (0, import_tips.findTips)(),
      (0, import_post.findPosts)({ published: true })
    ]);
    return { tips, posts };
  }
);
const links = () => {
  const merriweather = (0, import_fonts.findFontByName)("Playfair Display");
  const raleway = (0, import_fonts.findFontByName)("Raleway");
  const links2 = [];
  if (merriweather)
    links2.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links2.push({ rel: raleway.rel, href: raleway.href });
  return links2;
};
const meta = ({ data }) => {
  const { app } = data;
  return [
    { title: app.appName },
    { name: "description", content: app.description }
  ];
};
function Blog({ tips, posts }, path) {
  const font = (0, import_fonts.findFontByName)("Courier Prime");
  console.log("path", path);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-start", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: "w-full bg-cover bg-center",
        style: { backgroundImage: `url('/images/soccer-pitch.jpg')` },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: " bg-gray-700/20", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto max-w-3xl text-center px-6 py-16 sm:py-20 lg:px-8 lg:py-24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "h1",
          {
            className: "text-3xl font-bold tracking-tight text-white sm:text-4xl",
            style: {
              fontFamily: font.value
            },
            children: "Sport tips, predictions, analysis and news"
          }
        ) }) })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        className: "flex-1 w-full bg-repeat md:bg-no-repeat md:bg-cover md:bg-center",
        style: {
          backgroundImage: `url('/illustrations/bg-man-soccer.svg')`
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "bg-gray-100/40", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto grid w-full max-w-3xl items-start rounded-md p-4 md:p-8 gap-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { className: "w-full bg-white/90 overflow-hidden", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardHeader, { className: "p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-row flex-wrap items-center justify-center gap-4 p-2 bg-red-500 text-lg text-white font-semibold ", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold tracking-tight pe-4 border-e", children: "Top Fixtures" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_core.Button, { variant: "outline", className: "flex-none ml-auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ListFilter, { className: "h-5 w-5" }) })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid sm:grid-cols-2 gap-6 divide-y sm:divide-x sm:divide-y-0", children: tips && tips.map((tip, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tip_card.TipSummary, { tip }, index)) }) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto grid w-full max-w-3xl items-start p-4 md:p-8 gap-4 overflow-x-hidden", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { className: "w-full bg-white/90 overflow-hidden", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardHeader, { className: "p-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-row flex-wrap items-center justify-center gap-4 px-6 bg-red-500 text-lg text-white font-semibold ", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "text-lg font-bold tracking-tight pe-4 border-e", children: "Tips" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_select.Select, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectTrigger, { className: "flex-1 py-6 border-none rounded-none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectValue, { placeholder: "Country" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectContent, { className: "bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectItem, { value: "light", children: "England" }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_select.Select, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectTrigger, { className: "flex-1 py-6 border-none rounded-none", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectValue, { placeholder: "League" }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectContent, { className: "bg-white", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_select.SelectItem, { value: "light", children: "Premier League" }) })
              ] })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_scroll_area.ScrollArea, { className: "h-[500px] w-full", type: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid sm:grid-cols-2 gap-6 divide-y sm:divide-x sm:divide-y-0", children: tips && tips.map((tip, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_tip_card.TipSummary, { tip }, index)) }) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardFooter, { className: "justify-center border-t p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
              import_core.Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1 border border-gray-600",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ArrowBigDownDash, { className: "h-3.5 w-3.5" }),
                  "Load more"
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto w-full max-w-3xl p-4 md:p-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto w-full bg-white/90 border rounded-md shadow-sm", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "col-span-full mt-8 text-3xl text-center sm:text-4xl font-bold tracking-tight mb-10", children: "Team News" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_scroll_area.ScrollArea, { className: "h-96 w-full", type: "auto", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid sm:grid-cols-2 w-full items-start p-6 md:p-8 gap-6", children: posts && posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_post_summary.PostSummary, { post }, post._id)) }) })
          ] }) })
        ] })
      }
    )
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blogLoader,
  links,
  meta
});
//# sourceMappingURL=blog.js.map
