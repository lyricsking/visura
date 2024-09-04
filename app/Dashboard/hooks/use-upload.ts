import { useFetcher } from "@remix-run/react";
import { action } from "../routes/upload";

export function useFileUpload() {
  let { submit, data, state, formData } = useFetcher<typeof action>();
  let isUploading = state !== "idle";

  let uploadingFiles = formData
    ?.getAll("file")
    .filter((value: unknown): value is File => value instanceof File)
    .map((file) => {
      let name = file.name;
      // We will create an object URL, which is a `blob` URL string
      // we'll need this to render the imagein the browser as it's being uploaded.
      let url = URL.createObjectURL(file);
      return { name, url };
    });

  let images = (data?.files ?? []).concat(uploadingFiles ?? []);

  return {
    submit(files: FileList | null) {
      if (!files) return;
      let formData = new FormData();
      for (let file of files) formData.append("file", file);
      submit(formData, { method: "POST", encType: "multipart/form-data" });
    },
    isUploading,
    images,
  };
}
