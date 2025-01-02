import mongoose, { Schema, Model } from "mongoose";
import { IPlugin } from "~/core/types/plugin";

type IPluginModel = Model<IPlugin>;
const pluginSchema = new Schema<IPlugin, IPluginModel>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  version: { type: String, required: true },
  isActive: { type: Boolean, default: false },
  routes: { type: Schema.Types.Mixed, default: {} },
  adminMenu: { type: Schema.Types.Mixed, default: {} },
  widgets: { type: Schema.Types.Mixed, default: {} },
  options: { type: Schema.Types.Mixed, default: {} },
});

export const PluginModel: IPluginModel =
  mongoose.models.Plugin ||
  mongoose.model<IPlugin, IPluginModel>("Plugin", pluginSchema);
