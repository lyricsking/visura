import { Config } from "./config";
import appConfig from "./config/app.config.json";
import pluginsConfig from "./config/plugin.config.json";

export default class Context { 
  private readonly config: Config;
  
  constructor() {
    this.config = loadConfig();
  }
    
  private loadConfig() {
    // Determine the current environment
    const env = process.env.NODE_ENV === "production" ? "production" : "development";
    
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
    
    const configParse = configSchema.safeParse(envConfig);
    if (configParse.error) {
      throw configParse.error;
    }
    
    return configParse.data;
  }
}