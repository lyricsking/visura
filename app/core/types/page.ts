export interface Metadata {
  title: string,
  [key: string]: any;
}

export interface PageContent {
  type: "block" | "text" | "image" | "markdown" | "component";
  value: any;
}

export interface Page {
  id: string;
  metadata: Metadata;
  content: PageContent[];
}
