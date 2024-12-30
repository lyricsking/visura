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
var posts_exports = {};
__export(posts_exports, {
  default: () => Posts,
  handle: () => handle
});
module.exports = __toCommonJS(posts_exports);
var import_react_dropdown_menu = require("@radix-ui/react-dropdown-menu");
var import_react_progress = require("@radix-ui/react-progress");
var import_react_tabs = require("@radix-ui/react-tabs");
var import_react = require("@remix-run/react");
var import_lucide_react = require("lucide-react");
var import_badge = require("~/shared/components/badge");
var import_button = __toESM(require("~/shared/components/button"), 1);
var import_card = require("~/shared/components/card");
var import_table = require("~/shared/components/table");
var import_date = require("~/shared/utils/date");
var import_util = require("~/shared/utils/util");
var import_jsx_runtime = require("react/jsx-runtime");
const handle = {
  breadcrumb: {
    id: "post-list",
    label: "Posts"
  }
};
function Posts({ posts }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-auto grid gap-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { className: "sm:col-span-2", "x-chunk": "dashboard-05-chunk-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardTitle, { children: "Your Posts" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardDescription, { className: "max-w-lg text-balance leading-relaxed", children: "Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_lucide_react.Link,
          {
            to: `edit`,
            className: (0, import_util.cn)(
              (0, import_button.buttonVariants)(),
              "bg-indigo-500 text-white shadow-md"
            ),
            children: "Create New Post"
          }
        ) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { "x-chunk": "dashboard-05-chunk-1", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardDescription, { children: "This Week" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardTitle, { className: "text-4xl", children: "$1,329" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-muted-foreground", children: "+25% from last week" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_progress.Progress, { value: 25, "aria-label": "25% increase" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { "x-chunk": "dashboard-05-chunk-2", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardDescription, { children: "This Month" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardTitle, { className: "text-4xl", children: "$5,329" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-xs text-muted-foreground", children: "+10% from last month" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_progress.Progress, { value: 12, "aria-label": "12% increase" }) })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_tabs.Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-2 items-center justify-between gap-x-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_tabs.TabsList, { className: "", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_tabs.TabsTrigger, { value: "all", children: "All" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_tabs.TabsTrigger, { value: "active", children: "Active" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_tabs.TabsTrigger, { value: "draft", children: "Draft" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_tabs.TabsTrigger, { value: "archived", className: "hidden sm:flex", children: "Archived" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-flow-col-dense items-center gap-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_dropdown_menu.DropdownMenu, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_button.default, { variant: "outline", size: "sm", className: "h-8 gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.ListFilter, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only md:not-sr-only md:whitespace-nowrap", children: "Filter" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_dropdown_menu.DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuLabel, { children: "Filter by" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuSeparator, {}),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuCheckboxItem, { checked: true, children: "Active" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuCheckboxItem, { children: "Draft" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuCheckboxItem, { children: "Archived" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_button.default, { size: "sm", variant: "outline", className: "h-8 gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.File, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only md:not-sr-only md:whitespace-nowrap", children: "Export" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_button.default, { size: "sm", className: "h-8 gap-1 bg-indigo-400 text-white", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.PlusCircle, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only md:not-sr-only md:whitespace-nowrap", children: "Add Product" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_tabs.TabsContent, { value: "all", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.Card, { "x-chunk": "dashboard-06-chunk-0 w-full", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_card.CardHeader, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardTitle, { children: "Posts" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardDescription, { children: "Manage your products and view their sales performance." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_lucide_react.Table, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_table.TableRow, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { className: "hidden w-[100px] sm:table-cell", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: "Image" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { children: "Title" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { children: "Status" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { className: "hidden md:table-cell", children: "Excerpt" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { className: "hidden md:table-cell", children: "Total Views" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { className: "hidden md:table-cell", children: "Published on" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableHead, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableBody, { children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_table.TableRow, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "img",
              {
                alt: "Post image",
                className: "aspect-square rounded-md object-cover",
                height: "64",
                width: "64",
                src: "/placeholder.svg"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { className: "font-medium", children: post.title }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_badge.Badge, { variant: "outline", children: post.published ? "Active" : "Draft" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { className: "hidden md:table-cell font-medium", children: post.excerpt }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { className: "hidden xl:table-cell", children: "30" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { className: "hidden md:table-cell w-44 text-center", children: post.publishedOn ? (0, import_date.formatDateByParts)(new Date(post.publishedOn)) : "-" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_table.TableCell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_dropdown_menu.DropdownMenu, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                import_button.default,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_dropdown_menu.DropdownMenuContent, { align: "end", className: "bg-white", children: [
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuSeparator, {}),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react_dropdown_menu.DropdownMenuItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Form, { method: "post", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                    "input",
                    {
                      name: "id",
                      value: post._id,
                      className: "hidden"
                    }
                  ),
                  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                    import_button.default,
                    {
                      variant: "ghost",
                      type: "submit",
                      name: "action",
                      value: "publish",
                      className: "p-0 font-normal",
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Share2Icon, { className: "mr-2 h-4 w-4" }),
                        "Publish"
                      ]
                    }
                  )
                ] }) }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react_dropdown_menu.DropdownMenuItem, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_lucide_react.Trash2Icon, { className: "mr-2 h-4 w-4" }),
                  "Delete"
                ] })
              ] })
            ] }) })
          ] }, post._id)) })
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_card.CardFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "1-10" }),
          " of ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "32" }),
          " products"
        ] }) })
      ] }) })
    ] })
  ] });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handle
});
//# sourceMappingURL=posts.js.map
