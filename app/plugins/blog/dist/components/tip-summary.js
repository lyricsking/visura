"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import { Calendar, MessageCircleIcon } from "lucide-react";
import { formatDateByParts } from "~/shared/utils/date";
import { buttonVariants } from "~/shared/components/button";
import { Link } from "@remix-run/react";
import { cn } from "~/shared/utils/util";
export const TipSummary = (props) => {
  const { tip } = props;
  let path = "";
  path && path.length > 0 ? path : "/" + path;
  path += "/tips";
  return /* @__PURE__ */ jsxs("div", { className: "py-4 border-gray-200", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "/images/football.png",
              alt: "football img",
              className: "h-6 w-6 mr-2"
            }
          ),
          /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold", children: tip.prediction.outcome.value })
        ] }),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: path + "/" + tip.slug,
            className: cn(
              buttonVariants({ variant: "outline", radius: "md" }),
              "text-white bg-red-400 "
            ),
            children: "See Predictions"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("h4", { className: "text-md font-semibold", children: [
          tip.teamA,
          " vs ",
          tip.teamB
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500", children: [
          tip.leagueCountry,
          " ",
          tip.league
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-gray-500 flex items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "mr-2", children: /* @__PURE__ */ jsx(Calendar, { className: "h-5 w-5" }) }),
          tip.matchDate ? formatDateByParts(new Date(tip.matchDate)) : "-"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-4 mt-2 hidden", children: [
      /* @__PURE__ */ jsxs("div", { className: "inline-flex", children: [
        /* @__PURE__ */ jsx(MessageCircleIcon, { className: "h-5 w-5 mr-2" }),
        /* @__PURE__ */ jsx("p", { className: " text-sm text-gray-500", children: "9 comments" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "inline-flex", children: [
        /* @__PURE__ */ jsx("span", { className: "h-5 w-5 mr-1", children: "\u{1F3C5}" }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-500", children: "2 experts" })
      ] })
    ] })
  ] });
};
