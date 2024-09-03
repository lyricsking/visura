import React, { FormEvent, useRef } from "react";
import { Form, useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { Input } from "~/components/input";
import { ActionFunctionArgs, json } from "@remix-run/node";
import formDataToObject from "~/utils/form-data-to-object";
import { Textarea } from "~/components/textarea";
import { MarkdownEditor } from "~/components/markdown-editor";
import Button from "~/components/button";

export default function PostForm() {
  const data = useLoaderData<typeof loader>();

  const editorRef = useRef<HTMLTextAreaElement>(null);

  let navigation = useNavigation();
  let submit = useSubmit();

  let title = navigation.formData?.get("title")?.toString() || "";
  let slug = navigation.formData?.get("slug")?.toString() || "";
  let author = navigation.formData?.get("author")?.toString() || "";
  let content =
    navigation.formData?.get("content")?.toString() || editorRef.current?.value;
  let excerpt = navigation.formData?.get("excerpt")?.toString() || "";
  let tags = navigation.formData?.get("tags")?.toString().split(", ") || [];
  let publishedOn =
    navigation.formData && navigation.formData.get("publishedOn")
      ? new Date(navigation.formData.get("publishedOn")!.toString())
      : new Date();

  const isSubmitting = navigation.state !== "idle";

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

   
     const formData = new FormData(event.currentTarget);
     const content = formData.get('content') as string;
    
    
  }

  return (
    <div className="grid auto-rows-max gap-4 border rounded-md">
      <Form method="post" onSubmit={handleSubmit}>
        <div className="w-full grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <div>
            <label htmlFor="title">Title</label>
            <Input
              id="title"
              type="text"
              name="title"
              defaultValue={title || ""}
              required
              className="input"
            />
          </div>

          <div>
            <label htmlFor="featuredImage">Featured Image URL</label>
            <Input
              id="featuredImage"
              type="file"
              name="featuredImage"
              className="input"
            />
          </div>

          <div>
            <label htmlFor="tags">Tags (comma separated)</label>
            <Input
              id="tags"
              type="text"
              name="tags"
              defaultValue={tags?.join(", ") || ""}
              required
              className="input"
            />
          </div>

          <div className="col-span-full">
            <label htmlFor="excerpt">Excerpt</label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={excerpt || ""}
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
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  let content = formObject["content"];

  return json({});
};

export const loader = async () => {
  return json({});
};
