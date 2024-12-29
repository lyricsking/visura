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
var post_loader_exports = {};
__export(post_loader_exports, {
  loader: () => loader
});
module.exports = __toCommonJS(post_loader_exports);
var import_post = require("../server/post.server");
const loader = () => {
  return async ({ params }) => {
    let slug = params["slug"];
    if (!slug) throw Error("Post slug id must be provided.");
    let post = await (0, import_post.findPostBySlug)({ slug });
    if (!post) throw Error("No post was found.");
    return { post };
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loader
});
//# sourceMappingURL=post.loader.js.map
