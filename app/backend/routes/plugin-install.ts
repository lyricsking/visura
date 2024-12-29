import { ActionFunctionArgs } from "@remix-run/node";
import fs from "fs";
import path from "path";
import { Writable } from "stream";
import AdmZip from "adm-zip";
import { logger } from "~/shared/utils/logger";
import { installPlugin } from "~/shared/utils/plugin";

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

  installPlugin(pluginUrl);
  //
  //  return Response.json({ error: "Error downloading plugin" }, { status: 500 });
};
