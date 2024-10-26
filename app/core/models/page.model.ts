import mongoose, { Model, models, Schema } from "mongoose";
import { IPage } from "../types/page";

type IPageModel = Model<IPage>;
const pageSchema = new Schema<IPage, IPageModel>({
  metadata: { type: Schema.Types.Mixed, required: true },
  content: { type: Schema.Types.Mixed, required: true },
});

const PageModel: IPageModel =
  mongoose.models.Page || models<IPageModel>("Page", pageSchema);
