import { PluginModel } from "~/core/plugin/models/plugin.model";

export const seedPlugins = async () => {
  try {
    await PluginModel.updateOne(
      {
        name: "blog",
      },
      {
        name: "blog",
        description: "Blog description",
        path: "/app/plugins/blog/index",
        isActive: true,
        settings: {
          routes: [],
        },
        version: "0.0.1",
      },
      { upsert: true }
    );
    console.log("Plugin updated successfully");
  } catch (error) {
    console.error("Error seeding page %s", error);
  }
};
