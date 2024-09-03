import React, { useRef } from "react";
import { Form, useLoaderData, useNavigation } from "@remix-run/react";
import { Input } from "~/components/input";
import { ActionFunctionArgs, json } from "@remix-run/node";
import formDataToObject from "~/utils/form-data-to-object";
import { Textarea } from "~/components/textarea";
import { MarkdownEditor } from "~/components/editor";

export default function PostForm() {
  const data = useLoaderData<typeof loader>();

  let navigation = useNavigation();

  let title = navigation.formData?.get("title")?.toString() || "";
  let slug = navigation.formData?.get("slug")?.toString() || "";
  let author = navigation.formData?.get("author")?.toString() || "";
  let content = navigation.formData?.get("content")?.toString() || "# Block";
  let excerpt = navigation.formData?.get("excerpt")?.toString() || "";
  let tags = navigation.formData?.get("tags")?.toString().split(", ") || [];
  let publishedOn =
    navigation.formData && navigation.formData.get("publishedOn")
      ? new Date(navigation.formData.get("publishedOn")!.toString())
      : new Date();

  const editorRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editorRef.current) {
      const markdownContent = editorRef.current.innerText;
      // alert(JSON.stringify(markdownContent, null, 2));

      const formData = new FormData();
      formData.set("content", markdownContent);
    }
  };

  return (
    <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
      <Form method="post" onSubmit={handleSubmit}>
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
          <label htmlFor="slug">Slug</label>
          <Input
            id="slug"
            type="text"
            name="slug"
            defaultValue={slug || ""}
            className="input"
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <Input
            id="author"
            type="text"
            name="author"
            value={author || ""}
            readOnly
            className="input"
          />
        </div>

        <div>
          <label htmlFor="excerpt">Excerpt</label>
          <Textarea id="excerpt" name="excerpt" defaultValue={excerpt || ""} />
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
            className="input"
          />
        </div>

        <div>
          <label htmlFor="content">Content</label>
          <MarkdownEditor
            name="content"
            defaultValue={content || ""}
            editorRef={editorRef}
          />
        </div>

        <div>{/* <Button type="submit">Save Post</Button>*/}</div>
      </Form>
    </div>
  );
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const formObject = formDataToObject(formData);

  console.log(formObject);

  return json({});
};

export const loader = async () => {
  return json({});
};
