import mongoose, { model, Model, Schema } from "mongoose";
import { IPage, TemplateType, PageStatus } from "~/shared/types/page";

export type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  path: { type: String, unique: true },
  default: { type: Boolean, default: false },
  metadata: { type: Schema.Types.Mixed, required: true },
  content: { type: Schema.Types.Mixed, required: true },
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