import AdmZip from "adm-zip";
import fs from "fs";
import path from "path";
import { logger } from "./logger";
import { fileURLToPath } from "url";
import { IPlugin } from "../types/plugin";
import { PluginModel } from "~/backend/models/plugin.model";
import createDBConnection from "../services/db.server";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, "../../../public/plugins");

export function isPluginInstalled(plugnFolderName: string): boolean {
  return fs.existsSync(path.join(publicDir, plugnFolderName));
}

/**
 * Install plugin from the provided url
 * @param pluginUrl Url path to download the plugin zip file from
 * @returns folder name of the downloaded plugin
 */
export function installPlugin(pluginUrl: string) {
  // Define where to store the downloaded zip file temporarily
  const tempFile = path.join(publicDir, "temp-plugin.zip");
  // Get the plugin folder name from the url
  const pluginFolderName = pluginUrl.split("/").pop()?.split(".zip")[0];

  if (!pluginFolderName) {
    return Response.json({ error: "Invalid plugin url" }, { status: 400 });
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

      // Look for the manifest.json in the extracted folder
      const manifestPath = path.join(extractToDir, "manifest.json");
      console.log(manifestPath);

      if (fs.existsSync(manifestPath)) {
        // Read the JSON config file asychronously
        const manifestData = await fs.promises.readFile(manifestPath, "utf-8");

        // Parse the manifest file data into javascript object
        const manifest: IPlugin = JSON.parse(manifestData);

        // Validate manifest structure
        //
        const c = await PluginModel.create(manifest);
        console.log(c);
      }

      resolve();
    } catch (error) {
      logger(error);
      reject(`Error downloading plugin: ${error}`);
    }
  });
}

/**
 *
 * @param pluginName
 * @returns
 */
export async function getPluginManifest(pluginName: string): Promise<any> {
  if (!isPluginInstalled(pluginName)) {
    return;
  }

  const manifestPath = path.join(publicDir, pluginName, "manifest.js");

  if (fs.existsSync(manifestPath)) {
    // const manifest = await import(
    //   `../../../public/plugins/${pluginName}/manifest`
    // );

    const manifest = fs.readFileSync(manifestPath, "utf8");

    console.log(manifest);

    // console.log(`Loading plugin: ${manifest.name} (v${manifest.version})`);

    return manifest;
  } else {
    console.warn(`No manifest found in ${pluginName}`);
  }
}

export async function getInstalledPlugins(): Promise<any[]> {
  const c: any[] = [];

  if (!fs.existsSync(publicDir)) {
    return c;
  }

  const pluginFolders = fs.readdirSync(publicDir);

  for (const pluginFolder of pluginFolders) {
    const pluginPath = path.join(publicDir, pluginFolder);
    const manifestPath = path.join(pluginPath, "manifest.js");

    console.log("Path is", manifestPath);
    // /* @vite-ignore*/
    if (fs.existsSync(manifestPath)) {
      const manifest = await import(
        `../../../public/plugins/${pluginFolder}/manifest.js`
      );
      console.log(`Loading plugin: ${manifest.name} (v${manifest.version})`);

      c.push(manifest);
    } else {
      console.warn(`No manifest found in ${pluginFolder}`);
    }
  }

  return c;
}
