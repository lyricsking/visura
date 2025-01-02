import { ComponentType } from "react";
import visuraConfig from "visura.config";
import { PageMetadata } from "~/core/types/page";

export interface Widget {
  id: string;
  name: string;
  location: "dashboard";
  component: string;
}

interface MetaTags {
  property: string;
  content: string;
}

export interface RouteMetadata {
  title: string;
  description?: string;
  keywords?: string;
  openTags?: Array<MetaTags>;
}

export type Route = {
  id: string;
  path: string;
  metadata: PageMetadata;
  loaderEnpoint?: string;
  actionEnpoint?: string;
  component: ComponentType;
};

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
