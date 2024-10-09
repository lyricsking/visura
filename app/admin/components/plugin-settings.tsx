import { useState } from "react";
import Button from "~/components/button";
import { Switch } from "~/components/switch";

// Sample plugin data structure
type Plugin = {
  id: string;
  name: string;
  description: string;
  isInstalled: boolean;
  isEnabled: boolean;
};

export default function PluginSetting(plugins: Plugin[]) {
  
  // Handlers for installing, enabling, disabling, and uninstalling plugins
  const togglePlugin = (
    id: string,
    type: "enable" | "disable" | "install" | "uninstall"
  ) => {
   };

  // Rendering the plugin management UI
  return (
    <div className="p-6">
      <h2 className="text-lg font-medium mb-4">Manage Plugins</h2>
     <div className="flex flex-col justify-between gap-4 divide-y">
         <div className="space-y-2">
        {plugins.map((plugin) => (
          <div
            key={plugin.id}
            className="border p-4 rounded-lg flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-semibold">{plugin.name}</h3>
              <p className="text-sm text-gray-600">{plugin.description}</p>
            </div>
            <div className="flex items-center space-x-4">
              {plugin.isInstalled ? (
                <>
                  <Switch
                    checked={plugin.isEnabled}
                    onCheckedChange={() =>
                      togglePlugin(
                        plugin.id,
                        plugin.isEnabled ? "disable" : "enable"
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
                </>
              ) : (
                <Button onClick={() => togglePlugin(plugin.id, "install")}>
                  Install
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};
