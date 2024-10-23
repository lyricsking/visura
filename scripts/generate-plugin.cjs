const fs = require("fs");
const path = require("path");

// Utility function to capitalize the plugin name for display purposes
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

// Get the plugin name from the command-line arguments
const pluginName = process.argv[2];
if (!pluginName) {
  console.log("Error: Please provide a plugin name.");
  console.log("Usage: node scripts/generate-plugin.js <plugin-name>");
  process.exit(1);
}

// Define paths
const pluginsDir = path.join(__dirname, "..", "app", "plugins");
const pluginDir = path.join(pluginsDir, pluginName);
const srcDir = path.join(pluginDir, "src");
const assetsDir = path.join(pluginDir, "assets");

//  Check if the plugin alreaady existed
if (fs.existsSync(pluginDir)) {
  console.error(`Error: Plugin "${pluginName}" already exists.`);
  process.exit(1);
}

// Create plugin directory structure: src/ and assets/
fs.mkdirSync(srcDir, { recursive: true });
fs.mkdirSync(assetsDir, { recursive: true });

// Boilerplate content for index.ts
const indexContent = `
import { IPlugin } from "~/core/types/plugin";

const ${pluginName}Plugin: IPlugin = {
  id: "${pluginName}",
  name: "${capitalize(pluginName)}",
  description: "A custom plugin for ${capitalize(pluginName)}",
  version: "0.0.1",
  onInit(app) {
    // Plugin initialization logic
    // Register route, menu etc
  },
  onDestroy() {},
};

export default ${pluginName}Plugin;
`;

// Boilerplate content for index.ts
const indexServerContent = `
import { IPlugin } from "~/core/types/plugin";

const ${pluginName}Plugin: IPlugin = {
  id: "${pluginName}",
  name: "${capitalize(pluginName)}",
  description: "A custom plugin for ${capitalize(pluginName)}",
  version: "0.0.1",
  onInit(app) {
    // Plugin initialization logic
    // Register route, menu etc
  },
  onDestroy() {},
};

export default ${pluginName}Plugin;
`;

// BoilerPlate content for README.md
const readmeMdContent = `
# ${capitalize(pluginName)} Plugin


## Description

This plugin adds ${capitalize(
  pluginName
)} functionality to your RemixJs application.

## Structure

- **src**: The source folder, this folder will house plugin source codes, e.g. components, routes, types, models, etc depending on the complexity of the plugin.
- **assets/**: Place your plugin's static assets (e.g., images, icons) here
- **index.ts**: The main entry point for the plugin. It is expected to have a default export that extends from the IPlugin interface. 

## Usage

1. Ensure the plugin is placed inside the \`app/plugins/${pluginName}\` directory.
2. The plugin will be automaticallyloaded and its onInit function will be called.
3. All hooks used by the plugin are expected to be called here e.g. route, admin 
settings and menu hooks should called in the onInit function.


## Development


- **Route**: \`/${pluginName}\`
- **Component**: \`/${capitalize(pluginName)}Component\`


## License


MIT
`;

// Write index.ts and README.md files
fs.writeFileSync(path.join(pluginDir, "index.ts"), indexTsContent, "utf8");
fs.writeFileSync(path.join(pluginDir, "README.md"), readmeMdContent, "utf8");

console.log(
  `Plugin "${pluginName}" has been successfully created at ${pluginDir}`
);
