import { fi } from "@faker-js/faker";
import { ActionFunctionArgs } from "@remix-run/node";
import path from "path";

export const loader = () => {
  return Response.json({ message: "Ready to install plugin." });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const pluginUrl = url.searchParams.get("pluginUrl");

  if (!pluginUrl) {
    return Response.json({ error: "Plugin URL is required" }, { status: 400 });
  }

  // Define where to store the downloaded zip file temporarily
  const tempFile = path.join(__dirname, "../../../public/temp/plugin.zip");
};
