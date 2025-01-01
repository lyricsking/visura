"use strict";
export const activate = () => {
  return {
    metadata: {
      name: "Blog",
      description: "",
      version: "0.0.1"
    },
    options: {},
    routes: [
      {
        path: "blog",
        uniqueId: "vb#blog",
        metadata: { title: "Blog title", description: "", keywords: "" },
        content: "/plugins/blog/src/routes/blog"
      }
    ]
  };
};
