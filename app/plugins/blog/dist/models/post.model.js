"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var post_model_exports = {};
__export(post_model_exports, {
  default: () => post_model_default
});
module.exports = __toCommonJS(post_model_exports);
var import_mongoose = __toESM(require("mongoose"), 1);
var import_slug = require("../utils/slug");
const postSchema = new import_mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    author: { type: import_mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String, required: true },
    tags: { type: [String], required: true },
    published: { type: Boolean, default: false },
    publishedOn: { type: Date },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);
postSchema.pre("save", function(next) {
  if (this.isModified("title")) {
    this.slug = (0, import_slug.getSlug)(this.title);
  }
  next();
});
postSchema.pre("save", function(next) {
  this.updatedAt = /* @__PURE__ */ new Date();
  next();
});
postSchema.method("publish", async function() {
  if (!this.published) {
    this.published = true;
    if (!this.publishedOn) {
      this.publishedOn = /* @__PURE__ */ new Date();
    }
  }
  return this.save();
});
const PostModel = import_mongoose.default.models.Post || import_mongoose.default.model("Post", postSchema);
var post_model_default = PostModel;
//# sourceMappingURL=post.model.js.map
