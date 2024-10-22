export interface Metadata {
  name: string;
  value: any;
}

export interface PageContent {
  type: "block" | "text" | "image" | "markdown" | "component";
  value: any;
}

export type PageType = "app" | "admin";
export interface Page {
  id: string;
  title: string;
  metadata: Metadata[];
  path: string;
  content: PageContent[];
}
