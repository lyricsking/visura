import { definePlugin } from "~/core/plugin";
import { ActivateFunctionReturnType } from "~/core/types/plugin";
import Blog from "./routes/blog";

export default definePlugin({
  name: "Blog",
  description: "",
  version: "0.0.1",
  routes: [
    {
      id: "visura-blog",
      path: "/blog",
      metadata: { title: "Blog title", description: "", keywords: "" },
      component: Blog,
    },
  ],
});

// Called when the plugin is been activated.
// This function saves the plugin metadata to the database and
// registers the routes, menu etc
export const activate = (): ActivateFunctionReturnType => {
  return {
    metadata: {
      name: "Blog",
      description: "",
      version: "0.0.1",
    },
    options: {},
    routes: [
      {
        path: "blog",
        uniqueId: "vb#blog",
        metadata: { title: "Blog title", description: "", keywords: "" },
        content: "/plugins/blog/src/routes/blog",
      },
    ],
  } as ActivateFunctionReturnType;
};
