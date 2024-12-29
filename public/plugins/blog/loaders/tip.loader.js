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
var tip_loader_exports = {};
__export(tip_loader_exports, {
  loader: () => loader
});
module.exports = __toCommonJS(tip_loader_exports);
var import_tips = require("../server/tips.server");
const loader = async ({ params }) => {
  let slug = params["slug"];
  if (!slug) throw Error("Tip id must be provided.");
  let tip = await (0, import_tips.findTipBySlug)({ slug });
  if (!tip.data) throw Error("No tip was found with such.");
  return { tip: tip.data };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loader
});
//# sourceMappingURL=tip.loader.js.map
