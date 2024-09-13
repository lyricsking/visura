import defaultConfig from "./default.config.json";
import devConfig from "./dev.config.json";
import prodConfig from "./prod.config.json";
import { z } from "zod";

const pluginOptionSchema = z.object({
  enabled: z.boolean(),
  settings: z.optional(z.record(z.any())), // Optional plugin setting
});

export type PluginOptions = z.infer<typeof pluginOptionSchema>;

export const configSchema = z.object({
  appName: z.string(),
  description: z.string(),
  plugins: z.record(pluginOptionSchema),
});

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
