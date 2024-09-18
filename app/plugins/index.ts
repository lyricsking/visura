import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const loadPlugins = () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    // const pluginDir = path.join(__dirname, 'plugins');
    const pluginDir = __dirname;
    // Read the plugins directory synchronously
    const pluginFolders = fs.readdirSync(pluginDir);

    // Filter and load only directories containing an index.ts file
    const loadedPlugins = pluginFolders.map((pluginFolder) => {
      const pluginPath = path.join(pluginDir, pluginFolder, 'index.ts');
      try {
        // Synchronously load the plugin using dynamic import
        const plugin = require(pluginPath).default;
        return plugin;
      } catch (err) {
        console.error(`Error loading plugin from ${pluginPath}:`, err);
        return null;
      }
    });

    // Return only successfully loaded plugins
    return loadedPlugins.filter(Boolean);
  } catch (err) {
    console.error('Error loading plugins:', err);
    return [];
  }
};

export default loadPlugins;
