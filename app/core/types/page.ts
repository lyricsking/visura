import { Types } from "mongoose";

export interface PageMetadata {
  title: string;
  [key: string]: any;
}

export interface PageContentType {
  type:
    | "block"
    /*  |  "text" | "image" */
    | "markdown"
    | "component";
  value: any;
}

export interface IPage {
  id: Types.ObjectId;
  path: string;
  metadata: PageMetadata;
  content: PageContentType[];
}
