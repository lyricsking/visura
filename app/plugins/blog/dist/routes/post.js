"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import ReactMarkdown from "react-markdown";
import { formatDateOrTime } from "~/shared/utils/date";
export default function Post({ post }) {
  let publishedOn = post.publishedOn ? formatDateOrTime(new Date(post.publishedOn), {
    month: "long",
    day: "numeric",
    year: "numeric"
  }) : null;
  return /* @__PURE__ */ jsxs("article", { className: "max-w-3xl mx-auto px-4 md:py-8 md:px-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      publishedOn && /* @__PURE__ */ jsxs("p", { className: "text-gray-500", children: [
        "Published on ",
        publishedOn
      ] }),
      /* @__PURE__ */ jsx("h1", { className: "text-5xl break-words font-bold mt-1", children: post.title }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center mt-4", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: "author-image-url",
            alt: " author",
            className: "w-12 h-12 rounded-full"
          }
        ),
        /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs("div", { className: "ml-3", children: [
          /* @__PURE__ */ jsx("p", { className: "font-semibold", children: "Jamiu" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500", children: "@jamiu" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: post.featuredImage,
          alt: post.title,
          className: "w-full h-auto border rounded-lg mb-6"
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "prose md:prose-lg lg:prose-xl", children: /* @__PURE__ */ jsx(ReactMarkdown, { children: post.content }) })
    ] })
  ] });
}
