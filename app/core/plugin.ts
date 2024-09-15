export interface IPlugin {
  name: string,
  adminMenuLinks ? : { path: string;label: string } [];
  accountMenuLinks ? : { path: string, label: string },
  registerRoutes: (defineRoute: DefineRouteFunction) => any; // This could register routes
}

const plugins: {[pluginName: string]: IPlugin} = {};

export const registerPlugin = (plugin: IPlugin) => {
  if (!plugin.name) {
    throw new Error("Plugin must have a unique name");
  }
  
  if (!plugins[plugin.name]) {
    throw new Error(`Cannot register a duplicate plugin: ${plugin.name}. Plugin name must be unique.`);
  }
  
  plugins[plugin.name] = plugin;
};