const fs = require("fs-extra");
const path = require("path");
const archiver = require("archiver");
const esbuild = require("esbuild");
const { dir } = require("console");

const pluginName = process.argv[2];
if (!pluginName) {
  console.error("Please specify a plugin name to build.");
  process.exit(1);
}

const pluginsDir = path.resolve(__dirname, "../../app/plugins");
const pluginDir = path.join(pluginsDir, pluginName);
const outputDir = path.join(pluginDir, "dist");
const buildDir = path.join(pluginDir, "build");
const outputZip = path.join(buildDir, `${pluginName}.zip`);

const excludedFolders = ["build", "dist"];

function getValidFiles(dir) {
  let results = [];
  const fileList = fs.readdirSync(dir);

  fileList.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      if (!excludedFolders.includes(file)) {
        // If the file is a directory, recursilvely  search it
        results = results.concat(getValidFiles(filePath));
      }
    } else if (
      filePath.endsWith(".ts") ||
      filePath.endsWith(".js") ||
      // filePath.endsWith(".json") ||
      filePath.endsWith(".tsx") ||
      filePath.endsWith(".jsx")
    ) {
      // If the file is a `.ts, js, tsx, jsx, json` add to list
      results.push(filePath);
    }
  });

  return results;
}

/**
 * Recursively copy JSON files from the source directory to the destibation dirctory
 *
 * @param {*} srcDir
 * @param {*} ourDir
 */
function copyJSONFiles(srcDir, ourDir) {
  const files = fs.readdirSync(srcDir, { withFileTypes: true });

  for (const file of files) {
    const srcPath = path.join(srcDir, file.name);
    const outPath = path.join(ourDir, file.name);

    if (file.isDirectory()) {
      // Recurse into subdirectories
      fs.mkdirSync(outPath, { recursive: true });
      copyJSONFiles(srcPath, outPath);
    } else if (file.isFile() && path.extname(file.name) === ".json") {
      // Copy JSON file
      fs.copyFileSync(srcPath, outPath);
    }
  }
}

// Ensure plugin exists
if (!fs.existsSync(pluginDir)) {
  console.error(`Plugin  "${pluginName}" does not exist.`);
  process.exit(1);
}

// Clean and prepare directory
fs.removeSync(outputDir);
fs.ensureDirSync(outputDir);
fs.ensureDirSync(buildDir);

// Step 1: Compile the plugindir source code
const srcDir = path.join(pluginDir, "src");
if (!fs.existsSync(srcDir)) {
  console.error(
    `Source directory "${srcDir}" not found for plugin "${pluginName}".`
  );
  process.exit(1);
}

console.log(`Compiling plugin "${pluginName}"...`);

try {
  // Get all entrypoints files in the `src` directory and subdirectories
  const entryPoints = getValidFiles(srcDir);

  if (entryPoints.length === 0) {
    console.error(`No valid source files found in "${srcDir}"`);
    process.exit(1);
  }

  esbuild.buildSync({
    // entryPoints: [path.join(srcDir, "**/*.{ts,tsx,jsx}")],
    entryPoints,
    outdir: outputDir,
    bundle: false, // keep files separated instead of bundling
    platform: "node",
    format: "cjs",
    sourcemap: true, // Optional: include sourcemaps,
    treeShaking: true,
  });

  console.log(`Typescript compilation completed.`);
  // Copy JSON files
  copyJSONFiles(srcDir, outputDir);
  // console.log("JSON files copied.");

  console.log(`Compiled all files for plugin "${pluginName}".`);
} catch (error) {
  console.error(`Failed to compile plugin "${pluginName}":`, error);
  process.exit(1);
}

// Step 2: Copy assets (if any)
const assetsDir = path.join(pluginDir, "assets");
if (fs.existsSync(assetsDir)) {
  fs.copySync(assetsDir, path.join(outputDir, "assets"));
  console.log(`Copied assets for "${pluginName}".`);
}

// Step 3: Create a ZIP file
console.log(`Packaging plugin "${pluginName}"...`);
// Create a file to stream archive data
const output = fs.createWriteStream(outputZip);
const archive = archiver("zip", { zlib: { level: 9 } });

output.on("close", () => {
  console.log(`${archive.pointer()}  total bytes`);
  console.log(`Plugin "${pluginName}" has been packaged as "${outputZip}"`);
});

archive.on("error", (err) => {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Append plugin files
archive.directory(outputDir, false);

// Finalize
archive.finalize();
