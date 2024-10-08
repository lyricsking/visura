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

const PluginManager = () => {
  // Sample state for plugins (this should come from a server or a plugin registry)
  const [plugins, setPlugins] = useState<Plugin[]>([
    {
      id: "plugin-1",
      name: "SEO Plugin",
      description: "Optimize your site for search engines.",
      isInstalled: true,
      isEnabled: true,
    },
    {
      id: "plugin-2",
      name: "Analytics Plugin",
      description: "Track user data and analyze site traffic.",
      isInstalled: true,
      isEnabled: false,
    },
    {
      id: "plugin-3",
      name: "Cache Plugin",
      description: "Improve site speed with caching.",
      isInstalled: false,
      isEnabled: false,
    },
  ]);

  // Handlers for installing, enabling, disabling, and uninstalling plugins
  const togglePlugin = (
    id: string,
    type: "enable" | "disable" | "install" | "uninstall"
  ) => {
    setPlugins((prev) =>
      prev.map((plugin) => {
        if (plugin.id === id) {
          if (type === "install") plugin.isInstalled = true;
          if (type === "uninstall") plugin.isInstalled = false;
          if (type === "enable") plugin.isEnabled = true;
          if (type === "disable") plugin.isEnabled = false;
        }
        return plugin;
      })
    );
  };

  // Rendering the plugin management UI
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Manage Plugins</h2>
      <div className="space-y-4">
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
  );
};

export default PluginManager;
