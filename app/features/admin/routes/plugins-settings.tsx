import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Button from "~/shared/components/button";
import { Switch } from "~/shared/components/switch";
import { isAuthenticated } from "~/core/auth/server/auth.server";
import { PluginModel } from "~/core/plugin/models/plugin.model";
import { IPlugin } from "~/core/plugin/types/plugin";
import { IHydratedUser } from "~/core/user/models/user.model";
import { handleResponse } from "~/shared/utils/helpers";
import { DBReponse, handleDbResult } from "~/shared/utils/mongoose";

// Sample plugin data structure
type Plugin = {
  id: string;
  name: string;
  description: string;
  isInstalled: boolean;
  isEnabled: boolean;
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const authRes = await isAuthenticated(request);

  let response: DBReponse<IPlugin[] | null> = await handleDbResult(
    PluginModel.find({})
    // Fetch plugins from plugins repository
  );

  return handleResponse<IPlugin[] | null>({ ...response, statusCode: 200 });
};

export default function PluginSetting(pluginss: Plugin[]) {
  const { data: plugins } = useLoaderData<typeof loader>();

  plugins;
  // Handlers for installing, enabling, disabling, and uninstalling plugins
  const togglePlugin = (
    id: string,
    type: "enable" | "disable" | "install" | "uninstall"
  ) => {};

  // Rendering the plugin management UI
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-4">Manage Plugins</h2>
      <div className="flex flex-col justify-between gap-4 divide-y">
        <div className="space-y-2">
          {plugins &&
            plugins.map((plugin) => (
              <div
                key={plugin.id}
                className="border p-4 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="text-lg font-semibold">{plugin.name}</h3>
                  <p className="text-sm text-gray-600">{plugin.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <Switch
                    checked={plugin.isActive}
                    onCheckedChange={() =>
                      togglePlugin(
                        plugin.id,
                        plugin.isActive ? "disable" : "enable"
                      )
                    }
                    className="mr-2"
                  />
                  <Button
                    variant="destructive"
                    onClick={() => togglePlugin(plugin.id, "uninstall")}
                  >
                    Uninstall
                  </Button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
