import { useEffect, useRef } from "react";
import { useFetcher } from "react-router";
import Button from "~/shared/components/button";
import { ImagePreview } from "~/shared/components/image-preview";
import { Input } from "~/shared/components/input";
import { MarkdownEditor } from "~/shared/components/editor/markdown-editor";
import { Textarea } from "~/shared/components/textarea";
import { ValidationMessage } from "~/shared/components/ui/validation-message";
import { useFileUpload } from "~/shared/hooks/use-upload";
import { cn } from "~/shared/utils/util";
import { useToast } from "~/shared/hooks/use-toast";

export default function PostForm() {
  // const loaderData = useLoaderData<typeof loader>();

  const editorRef = useRef<HTMLTextAreaElement>(null);

  let fetcher = useFetcher({ key: "submit-post" });

  let { submit: uploadImage, isUploading, images } = useFileUpload();

  let data: any = fetcher.data;
  let title =
    data?.values?.title || fetcher.formData?.get("title")?.toString() || "";
  let content =
    data?.values?.content ||
    fetcher.formData?.get("content")?.toString() ||
    editorRef.current?.value;
  let excerpt =
    data?.values?.excerpt || fetcher.formData?.get("excerpt")?.toString() || "";
  let tags =
    (data?.values?.tags || fetcher.formData?.get("tags"))
      ?.toString()
      .split(", ") || [];

  const isSubmitting = fetcher.state !== "idle";

  const { toast } = useToast();

  useEffect(() => {
    if (!isUploading && images && images.length > 0) {
      // Set featuredImage to the first image in the images array
      images.forEach((image) => {
        if (!image.url.startsWith("blob:"))
          fetcher.formData?.set("featuredImage", image.url);
      });
    }
  }, [images, isUploading]);

  useEffect(() => {
    if (data?.post) {
      // Todo Show toast
      toast({ description: "Post created." });
      // Todo Reset form and navigate
    }
  }, [data]);

  return (
    <div className="w-full grid gap-4 p-4">
      <fetcher.Form method="post">
        <fieldset disabled={isSubmitting}>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="md:cols-span-2 lg:col-span-1 xl:col-span-2">
              <label htmlFor="title">Title</label>
              <Input
                id="title"
                type="text"
                name="title"
                defaultValue={title || ""}
                required
                className={cn(data?.errors?.title ? "border-red-400" : "")}
              />
              {data?.errors?.title ? (
                <ValidationMessage
                  isSubmitting={isSubmitting}
                  error={data?.errors?.title}
                />
              ) : null}
            </div>

            <div className="md:cols-span-2 lg:col-span-1 xl:col-span-2">
              <label htmlFor="tags">Tags (comma separated)</label>
              <Input
                id="tags"
                type="text"
                name="tags"
                defaultValue={tags?.join(", ") || ""}
                required
              />
            </div>

            <div className="col-span-full">
              <label
                htmlFor="featuredImage"
                className={data?.errors?.featuredImage ? "border-red-400" : ""}
              >
                {isUploading ? (
                  <p>Uploading Image...</p>
                ) : (
                  <p>Select featured Image</p>
                )}
              </label>
              <Input
                id="featuredImage"
                type="file"
                name="featuredImage"
                style={{ display: "none" }}
                onChange={(e) => uploadImage(e.currentTarget.files)}
              />
              {data?.errors?.featuredImage ? (
                <ValidationMessage
                  isSubmitting={isSubmitting}
                  error={data?.errors?.featuredImage}
                />
              ) : null}
              <div>
                {/*
                 * Here we render the images including the one we are
                 * uploading and the ones we've already  uploaded
                 */}
                {images.map((file) => {
                  return (
                    <ImagePreview
                      key={file.name}
                      name={file.name}
                      url={file.url}
                    />
                  );
                })}
              </div>
            </div>

            <div className="col-span-full ">
              <label htmlFor="excerpt">Excerpt</label>
              <Textarea
                id="excerpt"
                name="excerpt"
                defaultValue={excerpt || ""}
                required
              />
            </div>

            <div className="col-span-full">
              <label htmlFor="content">Content</label>
              <MarkdownEditor
                editorRef={editorRef}
                name="content"
                defaultValue={content || ""}
                required
              />
            </div>

            <div>
              <Button
                variant="outline"
                size="lg"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting" : "Save Post"}
              </Button>
            </div>
          </div>
        </fieldset>
      </fetcher.Form>
    </div>
  );
}
