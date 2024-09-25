import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export interface IPlugin {
  name: string;
  description: string;
  version: string;
  settings?: Record<string, any>;
  onInit?: () => void;
  onDestroy?: () => void;
  layoutComponent?: React.ComponentType;
}

export const plugins: { [key: string]: IPlugin } = {};

export const loadPlugins = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const pluginDir = path.join(__dirname, 'plugins');
    //const pluginDir = __dirname;
    // Read the plugins directory synchronously
    const pluginFolders = fs.readdirSync(pluginDir);
    
    
    const pluginsConfig = config.plugins;

    // Filter and load only directories containing an index.ts file
    pluginFolders.forEach((pluginFolder) => {
      const pluginPath = path.join(pluginDir, pluginFolder, 'index.ts');
      
      try {
        // Synchronously load the plugin using dynamic import
        const plugin: IPlugin = await import(pluginPath).default;
        
        if (!plugin.name || !plugin.version || typeof plugin.init !== "function") {
          throw new Error(`Invalid plugin: ${plugin.name}. Must have a name, version, and init function.`);
        }
        // Ensure plugin names are unique
        if (plugins[plugin.name]) {
          throw new Error(`Duplicate plugin name detected: ${plugin.name}`);
        }
        
        if(pluginsConfig[plugin.name]) {
          plugins[plugin.name] = plugin;
          
          plugin.onInit()
        } 
        console.log(`Plugin ${plugin.name} loaded.`);
        
      } catch (err) {
        console.error(`Error loading plugin from ${pluginPath}:`, err);
      }
    });
  } catch (err) {
    console.error('Error loading plugins:', err);
  }finally{
    console.log(`Loaded ${Object.keys(plugins).length} plugins`);
  }
};