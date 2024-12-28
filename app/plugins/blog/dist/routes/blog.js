"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import { ArrowBigDownDash, ListFilter } from "lucide-react";
import { PostSummary } from "../components/post-summary";
import { findFontByName } from "~/shared/utils/fonts";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@radix-ui/react-select";
import { serverOnly$ } from "vite-env-only/macros";
import { TipSummary } from "../components/tip-card";
import { findPosts } from "../server/post.server";
import { findTips } from "../server/tips.server";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader
} from "~/client/components/card";
import { Button } from "@mantine/core";
export const blogLoader = serverOnly$(
  async () => {
    const [tips, posts] = await Promise.all([
      findTips(),
      findPosts({ published: true })
    ]);
    return { tips, posts };
  }
);
export const links = () => {
  const merriweather = findFontByName("Playfair Display");
  const raleway = findFontByName("Raleway");
  const links2 = [];
  if (merriweather)
    links2.push({ rel: merriweather.rel, href: merriweather.href });
  if (raleway) links2.push({ rel: raleway.rel, href: raleway.href });
  return links2;
};
export const meta = ({ data }) => {
  const { app } = data;
  return [
    { title: app.appName },
    { name: "description", content: app.description }
  ];
};
export default function Blog({ tips, posts }, path) {
  const font = findFontByName("Courier Prime");
  console.log("path", path);
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start", children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "w-full bg-cover bg-center",
        style: { backgroundImage: `url('/images/soccer-pitch.jpg')` },
        children: /* @__PURE__ */ jsx("div", { className: " bg-gray-700/20", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-3xl text-center px-6 py-16 sm:py-20 lg:px-8 lg:py-24", children: /* @__PURE__ */ jsx(
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
    /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex-1 w-full bg-repeat md:bg-no-repeat md:bg-cover md:bg-center",
        style: {
          backgroundImage: `url('/illustrations/bg-man-soccer.svg')`
        },
        children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-100/40", children: [
          /* @__PURE__ */ jsx("div", { className: "mx-auto grid w-full max-w-3xl items-start rounded-md p-4 md:p-8 gap-2", children: /* @__PURE__ */ jsxs(Card, { className: "w-full bg-white/90 overflow-hidden", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "p-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap items-center justify-center gap-4 p-2 bg-red-500 text-lg text-white font-semibold ", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight pe-4 border-e", children: "Top Fixtures" }),
              /* @__PURE__ */ jsx(Button, { variant: "outline", className: "flex-none ml-auto", children: /* @__PURE__ */ jsx(ListFilter, { className: "h-5 w-5" }) })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 divide-y sm:divide-x sm:divide-y-0", children: tips && tips.map((tip, index) => /* @__PURE__ */ jsx(TipSummary, { tip }, index)) }) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto grid w-full max-w-3xl items-start p-4 md:p-8 gap-4 overflow-x-hidden", children: /* @__PURE__ */ jsxs(Card, { className: "w-full bg-white/90 overflow-hidden", children: [
            /* @__PURE__ */ jsx(CardHeader, { className: "p-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap items-center justify-center gap-4 px-6 bg-red-500 text-lg text-white font-semibold ", children: [
              /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold tracking-tight pe-4 border-e", children: "Tips" }),
              /* @__PURE__ */ jsxs(Select, { children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "flex-1 py-6 border-none rounded-none", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Country" }) }),
                /* @__PURE__ */ jsx(SelectContent, { className: "bg-white", children: /* @__PURE__ */ jsx(SelectItem, { value: "light", children: "England" }) })
              ] }),
              /* @__PURE__ */ jsxs(Select, { children: [
                /* @__PURE__ */ jsx(SelectTrigger, { className: "flex-1 py-6 border-none rounded-none", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "League" }) }),
                /* @__PURE__ */ jsx(SelectContent, { className: "bg-white", children: /* @__PURE__ */ jsx(SelectItem, { value: "light", children: "Premier League" }) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx(ScrollArea, { className: "h-[500px] w-full", type: "auto", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 gap-6 divide-y sm:divide-x sm:divide-y-0", children: tips && tips.map((tip, index) => /* @__PURE__ */ jsx(TipSummary, { tip }, index)) }) }) }),
            /* @__PURE__ */ jsx(CardFooter, { className: "justify-center border-t p-4", children: /* @__PURE__ */ jsxs(
              Button,
              {
                size: "sm",
                variant: "outline",
                className: "gap-1 border border-gray-600",
                children: [
                  /* @__PURE__ */ jsx(ArrowBigDownDash, { className: "h-3.5 w-3.5" }),
                  "Load more"
                ]
              }
            ) })
          ] }) }),
          /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-3xl p-4 md:p-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full bg-white/90 border rounded-md shadow-sm", children: [
            /* @__PURE__ */ jsx("h3", { className: "col-span-full mt-8 text-3xl text-center sm:text-4xl font-bold tracking-tight mb-10", children: "Team News" }),
            /* @__PURE__ */ jsx(ScrollArea, { className: "h-96 w-full", type: "auto", children: /* @__PURE__ */ jsx("div", { className: "grid sm:grid-cols-2 w-full items-start p-6 md:p-8 gap-6", children: posts && posts.map((post) => /* @__PURE__ */ jsx(PostSummary, { post }, post._id)) }) })
          ] }) })
        ] })
      }
    )
  ] });
}
//# sourceMappingURL=blog.js.map
