import mongoose, { model, Model, Schema } from "mongoose";
import { IPage } from "../types/page";

type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  path: { type: String, required: true, unique: true },
  default: { type: Boolean, default: false },
  metadata: { type: Schema.Types.Mixed, required: true },
  content: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  isTemplate: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
});

export const PageModel: IPageModel =
  mongoose.models.Page || model<IPage, IPageModel>("Page", pageSchema);
