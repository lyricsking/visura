import { ContentType } from "../models/content.server";
import { createDynamicModel } from "./model-generator";

async function initDynamicModels() {
  // Fetch all content types from database
  const ContentTypes = await ContentType.find();

  ContentTypes.forEach((contentType) => {
    createDynamicModel(contentType.modelName, contentType.fields);
  });
}
