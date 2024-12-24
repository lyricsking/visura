import { ContentType } from "../models/collection.model.server";
import { createDynamicModel } from "./collection-generator";

async function initDynamicModels() {
  // Fetch all content types from database
  const ContentTypes = await ContentType.find();

  ContentTypes.forEach((contentType) => {
    createDynamicModel(contentType.name, contentType.fields);
  });
}
