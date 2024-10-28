import mongoose, { model, Model, models, Schema } from "mongoose";
import { IOption } from "../types/option.type";

type IOptionModel = Model<IOption>;
const optionSchema = new Schema<IOption, IOptionModel>({
  name: { type: String, required: true },
  value: { type: Schema.Types.Mixed, default: {} },
});

export const OptionModel: IOptionModel =
  mongoose.models.Option ||
  model<IOption, IOptionModel>("Option", optionSchema);
