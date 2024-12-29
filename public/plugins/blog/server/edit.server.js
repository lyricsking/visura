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
var edit_server_exports = {};
__export(edit_server_exports, {
  action: () => action,
  loader: () => loader
});
module.exports = __toCommonJS(edit_server_exports);
var import_node = require("@remix-run/node");
var import_auth = require("~/core/auth/server/auth.server");
var import_form_data_to_object = __toESM(require("~/shared/utils/form-data-to-object"), 1);
var import_post = require("./post.server");
var import_mongoose = require("mongoose");
var import_mongoose2 = require("~/shared/utils/mongoose");
const action = async ({ request }) => {
  let authUser = await (0, import_auth.getAuthUser)(request);
  if (!authUser || !authUser.id) {
  }
  const formData = await request.formData();
  const formObject = (0, import_form_data_to_object.default)(formData);
  console.log(Object.fromEntries(formData));
  let response = await (0, import_post.createPost)({
    ...formObject,
    author: new import_mongoose.Types.ObjectId(),
    published: false
  });
  if (response.error) {
    const values = Object.fromEntries(formData);
    let errors = (0, import_mongoose2.parseError)(response.error);
    return (0, import_node.json)({ errors, values });
  }
  return (0, import_node.json)({ post: response.data });
};
const loader = () => {
  return async () => {
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  action,
  loader
});
//# sourceMappingURL=edit.server.js.map
