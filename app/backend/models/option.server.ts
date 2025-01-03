import mongoose, { model, Model, models, Schema, Types } from "mongoose";
import { IOption } from "~/core/types/option";

type IOptionModel = Model<IOption>;
const optionSchema = new Schema<IOption, IOptionModel>({
  name: { type: String, required: true, unique: true },
  value: { type: Schema.Types.Mixed, default: {} },
  autoload: { type: Boolean, default: false },
});

export const OptionModel: IOptionModel =
  mongoose.models.Option ||
  model<IOption, IOptionModel>("Option", optionSchema);
