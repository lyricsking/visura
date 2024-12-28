import { ActionFunctionArgs } from "@remix-run/node";
import fs from "fs";
import path from "path";
import { Writable } from "stream";
import AdmZip from "adm-zip";
import { logger } from "~/shared/utils/logger";
export const loader = () => {
  return Response.json({ message: "Ready to install plugin." });
};

const publicDir = path.join(__dirname, "../../../public/plugins");

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const pluginUrl = url.searchParams.get("pluginUrl");

  if (!pluginUrl) {
    return Response.json({ error: "Plugin URL is required" }, { status: 400 });
  }

  // Define where to store the downloaded zip file temporarily
  const tempFile = path.join(__dirname, "../../../public/temp-plugin.zip");
  // Get the plugin folder name from the url
  const pluginFolderName = pluginUrl.split("/").pop()?.split(".zip")[0];

  if (!pluginFolderName) {
    return Response.json({ error: "Inavlid plugin url" }, { status: 400 });
  }

  const extractToDir = path.join(publicDir, pluginFolderName);

  // Create the destination directory if it doesn't exist
  if (!fs.existsSync(extractToDir)) {
    fs.mkdirSync(extractToDir, { recursive: true });
  }

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
    zip.extractAllTo(extractToDir, true); // extract and overwrite if necessary

    // Clean up the temporary zip file
    fs.unlinkSync(tempFile);

    // Redirect to the admin plugin page after installation
  } catch (error) {
    logger(error);
    return Response.json(
      { error: "Error downloading plugin" },
      { status: 500 }
    );
  }
};
