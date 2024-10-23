import { IPlugin } from "~/core/types/plugin";
import Blog from "./src/routes/blog";

const blogPlugin: IPlugin = {
  id: "blog",
  name: "Blog",
  description: "",
  version: "0.0.1",
  onInit(app) {
    app.addRoute("app", {
      path: "blog",
      page: {
        id: "blog",
        metadata: { title: "Blog", description: "" },
        content: [
          {
            type: "component",
            value: Blog,
          },
        ],
      },
    });
  },
  onDestroy() {},
};

export default blogPlugin;
