import appConfig from "./app.config.json";
import pluginsConfig from "./plugin.config.json";
import { z } from "zod";

export const configSchema = z
  .object({
    app: z.object({
      appName: z.string().readonly(),
      description: z.string().readonly(),
      homepage: z.string().readonly(),
    }),
    plugins: z.record(z.boolean()).readonly(),
  })
  .readonly();

export type Config = z.infer<typeof configSchema>;

// Determine the current environment
const env =
  process.env.NODE_ENV === "production" ? "production" : "development";

const envConfig: Partial<Config> = {
  app: {
    ...appConfig["default"],
    ...appConfig[env],
  },
  plugins: {
    ...pluginsConfig["default"],
    ...pluginsConfig[env],
  },
};

const loadConfig = (): Config => {
  const configParse = configSchema.safeParse(envConfig);
  if (configParse.error) {
    throw configParse.error;
  }

  return configParse.data;
};

const config: Config = loadConfig();
export default config;
