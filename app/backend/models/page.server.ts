import mongoose, { model, Model, Schema } from "mongoose";
import { IPage, TemplateType, PageStatus } from "~/core/types/page";

export type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  uniqueId: { type: String, unique: true },
  path: { type: String, unique: true },
  metadata: { type: Schema.Types.Mixed, required: true },
  // content: { type: Schema.Types.Mixed, required: true },
  content: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  isTemplate: {
    type: String,
    enum: Object.values(TemplateType),
    default: "none",
  },
  status: { type: String, enum: Object.values(PageStatus), default: "draft" },
});

export const PageModel: IPageModel =
  mongoose.models.Page || model<IPage, IPageModel>("Page", pageSchema);
