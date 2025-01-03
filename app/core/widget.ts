import visuraConfig from "visura.config";

export interface Widget {
  id: string;
  name: string;
  location: "dashboard";
  component: string;
}

const widgetRegistry: Widget[] = [];

export const routeAliases: Record<string, string> = {
  // Example Route ID -> User-configured path
};

export function registerWidget(widget: Widget) {
  widgetRegistry.push(widget);
}

export function getWidgets(): Widget[] {
  return visuraConfig.plugins.flatMap<Widget>((plugin) => plugin.widgets || []);
}
