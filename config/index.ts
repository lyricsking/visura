import { Config } from "./config.type";
import { config as defaultConfig } from "./default.config";
import { config as devConfig } from "./dev.config";
import { config as prodConfig } from "./prod.config";

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

// Merge the default config with the environment-specific config
export const config: Config = {
  ...defaultConfig,
  ...envConfig,
};
