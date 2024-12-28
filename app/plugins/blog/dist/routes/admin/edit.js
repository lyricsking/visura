"use strict";
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { useFetcher } from "@remix-run/react";
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
  const editorRef = useRef(null);
  let fetcher = useFetcher({ key: "submit-post" });
  let { submit: uploadImage, isUploading, images } = useFileUpload();
  let data = fetcher.data;
  let title = data?.values?.title || fetcher.formData?.get("title")?.toString() || "";
  let content = data?.values?.content || fetcher.formData?.get("content")?.toString() || editorRef.current?.value;
  let excerpt = data?.values?.excerpt || fetcher.formData?.get("excerpt")?.toString() || "";
  let tags = (data?.values?.tags || fetcher.formData?.get("tags"))?.toString().split(", ") || [];
  const isSubmitting = fetcher.state !== "idle";
  const { toast } = useToast();
  useEffect(() => {
    if (!isUploading && images && images.length > 0) {
      images.forEach((image) => {
        if (!image.url.startsWith("blob:"))
          fetcher.formData?.set("featuredImage", image.url);
      });
    }
  }, [images, isUploading]);
  useEffect(() => {
    if (data?.post) {
      toast({ description: "Post created." });
    }
  }, [data]);
  return /* @__PURE__ */ jsx("div", { className: "w-full grid gap-4 p-4", children: /* @__PURE__ */ jsx(fetcher.Form, { method: "post", children: /* @__PURE__ */ jsx("fieldset", { disabled: isSubmitting, children: /* @__PURE__ */ jsxs("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:cols-span-2 lg:col-span-1 xl:col-span-2", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "title", children: "Title" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "title",
          type: "text",
          name: "title",
          defaultValue: title || "",
          required: true,
          className: cn(data?.errors?.title ? "border-red-400" : "")
        }
      ),
      data?.errors?.title ? /* @__PURE__ */ jsx(
        ValidationMessage,
        {
          isSubmitting,
          error: data?.errors?.title
        }
      ) : null
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "md:cols-span-2 lg:col-span-1 xl:col-span-2", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "tags", children: "Tags (comma separated)" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "tags",
          type: "text",
          name: "tags",
          defaultValue: tags?.join(", ") || "",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-full", children: [
      /* @__PURE__ */ jsx(
        "label",
        {
          htmlFor: "featuredImage",
          className: data?.errors?.featuredImage ? "border-red-400" : "",
          children: isUploading ? /* @__PURE__ */ jsx("p", { children: "Uploading Image..." }) : /* @__PURE__ */ jsx("p", { children: "Select featured Image" })
        }
      ),
      /* @__PURE__ */ jsx(
        Input,
        {
          id: "featuredImage",
          type: "file",
          name: "featuredImage",
          style: { display: "none" },
          onChange: (e) => uploadImage(e.currentTarget.files)
        }
      ),
      data?.errors?.featuredImage ? /* @__PURE__ */ jsx(
        ValidationMessage,
        {
          isSubmitting,
          error: data?.errors?.featuredImage
        }
      ) : null,
      /* @__PURE__ */ jsx("div", { children: images.map((file) => {
        return /* @__PURE__ */ jsx(
          ImagePreview,
          {
            name: file.name,
            url: file.url
          },
          file.name
        );
      }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-full ", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "excerpt", children: "Excerpt" }),
      /* @__PURE__ */ jsx(
        Textarea,
        {
          id: "excerpt",
          name: "excerpt",
          defaultValue: excerpt || "",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "col-span-full", children: [
      /* @__PURE__ */ jsx("label", { htmlFor: "content", children: "Content" }),
      /* @__PURE__ */ jsx(
        MarkdownEditor,
        {
          editorRef,
          name: "content",
          defaultValue: content || "",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "outline",
        size: "lg",
        type: "submit",
        disabled: isSubmitting,
        children: isSubmitting ? "Submitting" : "Save Post"
      }
    ) })
  ] }) }) }) });
}
//# sourceMappingURL=edit.js.map
