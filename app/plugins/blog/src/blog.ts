import { IPluginImpl, ActivateFunctionData } from "~/shared/types/plugin";

// Called when the plugin is been activated.
// This function saves the plugin metadata to the database and
// registers the routes, menu etc
export const activate = (): ActivateFunctionData => {
  return {
    metadata: {
      name: "Blog",
      description: "",
      version: "0.0.1",
    },
    routes: [
      {}
    ]
  } as ActivateFunctionData;
};
