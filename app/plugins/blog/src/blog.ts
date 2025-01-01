import { IPluginImpl, ActivateFunctionReturnType } from "~/shared/types/plugin";

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
