"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var blog_server_exports = {};
__export(blog_server_exports, {
  action: () => action,
  loader: () => loader
});
module.exports = __toCommonJS(blog_server_exports);
var import_node = require("@remix-run/node");
var import_post = require("./post.server");
const action = async ({ request }) => {
  const formData = await request.formData();
  const action2 = formData.get("action");
  if (action2 === "publish") {
    const id = formData.get("id");
    if (id) {
      console.log(await (0, import_post.publishPost)(id));
    }
    return (0, import_node.json)({ success: true });
  }
};
const loader = (app) => {
  return async () => {
    const posts = await (0, import_post.findPosts)({});
    return posts;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  action,
  loader
});
//# sourceMappingURL=blog.server.js.map
