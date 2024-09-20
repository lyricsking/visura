import defaultConfig from "./default.config.json";
import devConfig from "./dev.config.json";
import prodConfig from "./prod.config.json";
import { z } from "zod";

const pluginSettingsSchema = z
  .object({
    path: z.string(),
    adminMenuLinks: z.optional(z.array(z.string())),
    accountMenuLinks: z.optional(z.array(z.string())),
  })
  .passthrough();
export interface PluginSettingsType
  extends z.infer<typeof pluginSettingsSchema> {}

const pluginOptionSchema = z.object({
  enabled: z.boolean(),
  settings: pluginSettingsSchema, // Optional plugin setting
});

export type PluginOptions = z.infer<typeof pluginOptionSchema>;

export const configSchema = z
  .object({
    appName: z.string().readonly(),
    description: z.string().readonly(),
    plugins: z.record(pluginOptionSchema).readonly(),
  })
  .readonly();

export type Config = z.infer<typeof configSchema>;

// Determine the current environment
const env = process.env.NODE_ENV || "development";

let envConfig: Partial<Config> = {};

switch (env) {
  case "production":
    envConfig = prodConfig;
    break;
  case "development":
  default:
    envConfig = devConfig;
    break;
}

const loadConfig = (): Config => {
  // Merge the default config with the environment-specific config
  let config = { ...defaultConfig, ...envConfig };

  const configParse = configSchema.safeParse(config);
  if (configParse.error) {
    throw configParse.error;
  }

  return configParse.data;
};
const config: Config = loadConfig();
export default config;
