import mongoose, { Schema, Model } from "mongoose";
import { IPlugin } from "~/shared/types/plugin";

type IPluginModel = Model<IPlugin>;
const pluginSchema = new Schema<IPlugin, IPluginModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  path: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  settings: { type: Schema.Types.Mixed, default: {} },
  version: { type: String, required: true },
});

export const PluginModel: IPluginModel =
  mongoose.models.Plugin ||
  mongoose.model<IPlugin, IPluginModel>("Plugin", pluginSchema);
