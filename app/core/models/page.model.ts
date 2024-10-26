import mongoose, { model, Model, Schema } from "mongoose";
import { IPage } from "../types/page";

type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  metadata: { type: Schema.Types.Mixed, required: true },
  content: { type: Schema.Types.Mixed, required: true },
});

export const PageModel: IPageModel =
  mongoose.models.Page || model<IPageModel>("Page", pageSchema);
