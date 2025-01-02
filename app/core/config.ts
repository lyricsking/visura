import { PluginConfig } from "~/core/plugin";
import { Widget } from "./widget";

export interface VisuraConfig {
  plugins: Array<PluginConfig>;
}

export function defineConfig(config: VisuraConfig) {
  return config;
}
