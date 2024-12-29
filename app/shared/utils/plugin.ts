import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { logger } from "./logger";

const publicDir = path.join(__dirname, "../../../public/plugins");

export function isPluginInstalled(plugnFolderName: string): boolean {
  return fs.existsSync(path.join(publicDir, plugnFolderName));
}

export function installPlugin(pluginUrl: string) {
  // Define where to store the downloaded zip file temporarily
  const tempFile = path.join(publicDir, "temp-plugin.zip");
  // Get the plugin folder name from the url
  const pluginFolderName = pluginUrl.split("/").pop()?.split(".zip")[0];

  if (!pluginFolderName) {
    return Response.json({ error: "Inavlid plugin url" }, { status: 400 });
  }

  return new Promise<void>(async (resolve, reject) => {
    try {
      // Download the zip file from the provided URL
      const response = await fetch(pluginUrl, { method: "GET" });

      if (!response.ok) {
        throw new Error("Failed to fetch the plugin zip file");
      }

      // Create a writable stream to sav ethe downloaded file
      const writer = fs.createWriteStream(tempFile);
      const webWritableStream = new WritableStream<Uint8Array>({
        write(chunk) {
          return new Promise((resolve, reject) => {
            // Write each chunk to the file system
            writer.write(chunk, (err) => {
              if (err) reject(err);
              else resolve();
            });
          });
        },
        close() {
          writer.end();
        },
      });

      // Use pipeTo to write the fetch response stream to the file
      await response.body?.pipeTo(webWritableStream);

      const zip = new AdmZip(tempFile);
      const extractToDir = path.join(publicDir, pluginFolderName);

      // Ensure the directory exists
      if (!fs.existsSync(extractToDir)) {
        fs.mkdirSync(extractToDir, { recursive: true });
      }
      // Extract  the plugin
      zip.extractAllTo(extractToDir, true); // extract and overwrite if necessary

      // Clean up the temporary zip file
      fs.unlinkSync(tempFile);

      resolve();
    } catch (error) {
      logger(error);
      reject(`Error downloading plugin: ${error}`);
    }
  });
}

export function fetchLocalPlugins() {
  const pluginFolders = fs.readdirSync(publicDir);

  return pluginFolders.map((pluginFolder) => {
    const pluginPath = path.join(publicDir, pluginFolder);
    const configPath = path.join(pluginPath, "manifest.js");

    if (fs.existsSync(configPath)) {
      const manifest = require(configPath);
      console.log(`Loading plugin: ${manifest.name} (v${manifest.version})`);

      return manifest;
    } else {
      console.warn(`No manifest found in ${pluginFolder}`);
    }
  });
}
