export interface Metadata {
  name: string;
  value: any;
}

export interface PageContent {
  type: "block" | "text" | "image" | "markdown" | "component";
  value: any;
}

export interface Page {
  id: string;
  title: string;
  metadata: Metadata[];
  slug: string;
  content: PageContent[];
}
