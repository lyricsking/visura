export interface Field {
  name: string; // name
  // title: string; // Name
  type: string; // string, number, boolean etc
  required: boolean;
}

export interface IContentType {
  name: string; // name of the schema e.g Product
  fields: Field[];
  createdAt: Date;
  updatedAt: Date;
}
