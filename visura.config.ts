import blog from "plugins/blog/blog";
import { defineConfig } from "~/core/config";

export default defineConfig({
  defauitRoute: "/blog",
  plugins: [blog],
});
