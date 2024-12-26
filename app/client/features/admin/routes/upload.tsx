import {
  json,
  NodeOnDiskFile,
  unstable_composeUploadHandlers,
  unstable_createFileUploadHandler,
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
  type ActionFunctionArgs,
} from "@remix-run/node";

export async function action({ request }: ActionFunctionArgs) {
  let folder = "post";

  const fileUploaderHandler = unstable_createFileUploadHandler({
    filter({ contentType }) {
      return contentType.includes("image");
    },
    // strore the images in images/${folder} folder
    directory: `./public/images/${folder}`,
    // By default a number is added to duplicate files,
    // we will disable it to replace it
    avoidFileConflicts: false,
    // Use the the actual file name as the final filename
    file({ filename }) {
      return filename;
    },
    // Limit the max size to 10MB
    maxPartSize: 10 * 1024 * 1024,
  });

  let composedHandler = unstable_composeUploadHandlers(
    fileUploaderHandler,
    unstable_createMemoryUploadHandler()
  );

  let formData = await unstable_parseMultipartFormData(
    request,
    composedHandler
  );

  let files = formData.getAll("file") as NodeOnDiskFile[];
  return json({
    files: files.map((file) => ({
      name: file.name,
      url: `/images/${folder}/${file.name}`,
    })),
  });
}
