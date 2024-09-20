import fs from "fs";
import { Config } from "~/config";

const saveConfig = (environment: string, newConfig: Config) => {
  //   const env = process.env.NODE_ENV || "development";
  //   const configFile =
  //     env === "production" ? "config/default.config.json" : "config/config";
  fs.writeFileSync("config/runtime.config", JSON.stringify(newConfig, null, 2));
  return true;
};
