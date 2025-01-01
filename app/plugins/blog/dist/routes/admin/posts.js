"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuItem
} from "@radix-ui/react-dropdown-menu";
import { Progress } from "@radix-ui/react-progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { Form } from "@remix-run/react";
import {
  Link,
  ListFilter,
  PlusCircle,
  Table,
  MoreHorizontal,
  Share2Icon,
  Trash2Icon,
  File
} from "lucide-react";
import { Badge } from "~/shared/components/badge";
import Button, { buttonVariants } from "~/shared/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
  CardContent
} from "~/shared/components/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "~/shared/components/table";
import { formatDateByParts } from "~/shared/utils/date";
import { cn } from "~/shared/utils/util";
export const handle = {
  breadcrumb: {
    id: "post-list",
    label: "Posts"
  }
};
export default function Posts({ posts }) {
  return /* @__PURE__ */ jsxs("div", { className: "mx-auto grid gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxs(Card, { className: "sm:col-span-2", "x-chunk": "dashboard-05-chunk-0", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-3", children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Your Posts" }),
          /* @__PURE__ */ jsx(CardDescription, { className: "max-w-lg text-balance leading-relaxed", children: "Introducing Our Dynamic Orders Dashboard for Seamless Management and Insightful Analysis." })
        ] }),
        /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(
          Link,
          {
            to: `edit`,
            className: cn(
              buttonVariants(),
              "bg-indigo-500 text-white shadow-md"
            ),
            children: "Create New Post"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-05-chunk-1", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "This Week" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "$1,329" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "+25% from last week" }) }),
        /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Progress, { value: 25, "aria-label": "25% increase" }) })
      ] }),
      /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-05-chunk-2", children: [
        /* @__PURE__ */ jsxs(CardHeader, { className: "pb-2", children: [
          /* @__PURE__ */ jsx(CardDescription, { children: "This Month" }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-4xl", children: "$5,329" })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsx("div", { className: "text-xs text-muted-foreground", children: "+10% from last month" }) }),
        /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsx(Progress, { value: 12, "aria-label": "12% increase" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(Tabs, { defaultValue: "all", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 items-center justify-between gap-x-4", children: [
        /* @__PURE__ */ jsxs(TabsList, { className: "", children: [
          /* @__PURE__ */ jsx(TabsTrigger, { value: "all", children: "All" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "active", children: "Active" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "draft", children: "Draft" }),
          /* @__PURE__ */ jsx(TabsTrigger, { value: "archived", className: "hidden sm:flex", children: "Archived" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-flow-col-dense items-center gap-2", children: [
          /* @__PURE__ */ jsxs(DropdownMenu, { children: [
            /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(Button, { variant: "outline", size: "sm", className: "h-8 gap-1", children: [
              /* @__PURE__ */ jsx(ListFilter, { className: "h-3.5 w-3.5" }),
              /* @__PURE__ */ jsx("span", { className: "sr-only md:not-sr-only md:whitespace-nowrap", children: "Filter" })
            ] }) }),
            /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", children: [
              /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Filter by" }),
              /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
              /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { checked: true, children: "Active" }),
              /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Draft" }),
              /* @__PURE__ */ jsx(DropdownMenuCheckboxItem, { children: "Archived" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", variant: "outline", className: "h-8 gap-1", children: [
            /* @__PURE__ */ jsx(File, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only md:not-sr-only md:whitespace-nowrap", children: "Export" })
          ] }),
          /* @__PURE__ */ jsxs(Button, { size: "sm", className: "h-8 gap-1 bg-indigo-400 text-white", children: [
            /* @__PURE__ */ jsx(PlusCircle, { className: "h-3.5 w-3.5" }),
            /* @__PURE__ */ jsx("span", { className: "sr-only md:not-sr-only md:whitespace-nowrap", children: "Add Product" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(TabsContent, { value: "all", children: /* @__PURE__ */ jsxs(Card, { "x-chunk": "dashboard-06-chunk-0 w-full", children: [
        /* @__PURE__ */ jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsx(CardTitle, { children: "Posts" }),
          /* @__PURE__ */ jsx(CardDescription, { children: "Manage your products and view their sales performance." })
        ] }),
        /* @__PURE__ */ jsx(CardContent, { children: /* @__PURE__ */ jsxs(Table, { children: [
          /* @__PURE__ */ jsx(TableHeader, { children: /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableHead, { className: "hidden w-[100px] sm:table-cell", children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Image" }) }),
            /* @__PURE__ */ jsx(TableHead, { children: "Title" }),
            /* @__PURE__ */ jsx(TableHead, { children: "Status" }),
            /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Excerpt" }),
            /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Total Views" }),
            /* @__PURE__ */ jsx(TableHead, { className: "hidden md:table-cell", children: "Published on" }),
            /* @__PURE__ */ jsx(TableHead, { children: /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Actions" }) })
          ] }) }),
          /* @__PURE__ */ jsx(TableBody, { children: posts.map((post) => /* @__PURE__ */ jsxs(TableRow, { children: [
            /* @__PURE__ */ jsx(TableCell, { className: "hidden sm:table-cell", children: /* @__PURE__ */ jsx(
              "img",
              {
                alt: "Post image",
                className: "aspect-square rounded-md object-cover",
                height: "64",
                width: "64",
                src: "/placeholder.svg"
              }
            ) }),
            /* @__PURE__ */ jsx(TableCell, { className: "font-medium", children: post.title }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsx(Badge, { variant: "outline", children: post.published ? "Active" : "Draft" }) }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell font-medium", children: post.excerpt }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden xl:table-cell", children: "30" }),
            /* @__PURE__ */ jsx(TableCell, { className: "hidden md:table-cell w-44 text-center", children: post.publishedOn ? formatDateByParts(new Date(post.publishedOn)) : "-" }),
            /* @__PURE__ */ jsx(TableCell, { children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
              /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsxs(
                Button,
                {
                  "aria-haspopup": "true",
                  size: "icon",
                  variant: "ghost",
                  children: [
                    /* @__PURE__ */ jsx(MoreHorizontal, { className: "h-4 w-4" }),
                    /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Toggle menu" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "end", className: "bg-white", children: [
                /* @__PURE__ */ jsx(DropdownMenuLabel, { children: "Actions" }),
                /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
                /* @__PURE__ */ jsx(DropdownMenuItem, { children: /* @__PURE__ */ jsxs(Form, { method: "post", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      name: "id",
                      value: post._id,
                      className: "hidden"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    Button,
                    {
                      variant: "ghost",
                      type: "submit",
                      name: "action",
                      value: "publish",
                      className: "p-0 font-normal",
                      children: [
                        /* @__PURE__ */ jsx(Share2Icon, { className: "mr-2 h-4 w-4" }),
                        "Publish"
                      ]
                    }
                  )
                ] }) }),
                /* @__PURE__ */ jsxs(DropdownMenuItem, { children: [
                  /* @__PURE__ */ jsx(Trash2Icon, { className: "mr-2 h-4 w-4" }),
                  "Delete"
                ] })
              ] })
            ] }) })
          ] }, post._id)) })
        ] }) }),
        /* @__PURE__ */ jsx(CardFooter, { children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          /* @__PURE__ */ jsx("strong", { children: "1-10" }),
          " of ",
          /* @__PURE__ */ jsx("strong", { children: "32" }),
          " products"
        ] }) })
      ] }) })
    ] })
  ] });
}
