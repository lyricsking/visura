"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var edit_exports = {};
__export(edit_exports, {
  default: () => PostForm
});
module.exports = __toCommonJS(edit_exports);
var import_react = require("react");
var import_react2 = require("@remix-run/react");
var import_button = __toESM(require("~/shared/components/button"), 1);
var import_image_preview = require("~/shared/components/image-preview");
var import_input = require("~/shared/components/input");
var import_markdown_editor = require("~/shared/components/editor/markdown-editor");
var import_textarea = require("~/shared/components/textarea");
var import_validation_message = require("~/shared/components/ui/validation-message");
var import_use_upload = require("~/shared/hooks/use-upload");
var import_util = require("~/shared/utils/util");
var import_use_toast = require("~/shared/hooks/use-toast");
var import_jsx_runtime = require("react/jsx-runtime");
function PostForm() {
  const editorRef = (0, import_react.useRef)(null);
  let fetcher = (0, import_react2.useFetcher)({ key: "submit-post" });
  let { submit: uploadImage, isUploading, images } = (0, import_use_upload.useFileUpload)();
  let data = fetcher.data;
  let title = data?.values?.title || fetcher.formData?.get("title")?.toString() || "";
  let content = data?.values?.content || fetcher.formData?.get("content")?.toString() || editorRef.current?.value;
  let excerpt = data?.values?.excerpt || fetcher.formData?.get("excerpt")?.toString() || "";
  let tags = (data?.values?.tags || fetcher.formData?.get("tags"))?.toString().split(", ") || [];
  const isSubmitting = fetcher.state !== "idle";
  const { toast } = (0, import_use_toast.useToast)();
  (0, import_react.useEffect)(() => {
    if (!isUploading && images && images.length > 0) {
      images.forEach((image) => {
        if (!image.url.startsWith("blob:"))
          fetcher.formData?.set("featuredImage", image.url);
      });
    }
  }, [images, isUploading]);
  (0, import_react.useEffect)(() => {
    if (data?.post) {
      toast({ description: "Post created." });
    }
  }, [data]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full grid gap-4 p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(fetcher.Form, { method: "post", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("fieldset", { disabled: isSubmitting, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "md:cols-span-2 lg:col-span-1 xl:col-span-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "title", children: "Title" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_input.Input,
        {
          id: "title",
          type: "text",
          name: "title",
          defaultValue: title || "",
          required: true,
          className: (0, import_util.cn)(data?.errors?.title ? "border-red-400" : "")
        }
      ),
      data?.errors?.title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_validation_message.ValidationMessage,
        {
          isSubmitting,
          error: data?.errors?.title
        }
      ) : null
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "md:cols-span-2 lg:col-span-1 xl:col-span-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "tags", children: "Tags (comma separated)" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_input.Input,
        {
          id: "tags",
          type: "text",
          name: "tags",
          defaultValue: tags?.join(", ") || "",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "col-span-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "label",
        {
          htmlFor: "featuredImage",
          className: data?.errors?.featuredImage ? "border-red-400" : "",
          children: isUploading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Uploading Image..." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Select featured Image" })
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_input.Input,
        {
          id: "featuredImage",
          type: "file",
          name: "featuredImage",
          style: { display: "none" },
          onChange: (e) => uploadImage(e.currentTarget.files)
        }
      ),
      data?.errors?.featuredImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_validation_message.ValidationMessage,
        {
          isSubmitting,
          error: data?.errors?.featuredImage
        }
      ) : null,
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: images.map((file) => {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_image_preview.ImagePreview,
          {
            name: file.name,
            url: file.url
          },
          file.name
        );
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "col-span-full ", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "excerpt", children: "Excerpt" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_textarea.Textarea,
        {
          id: "excerpt",
          name: "excerpt",
          defaultValue: excerpt || "",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "col-span-full", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", { htmlFor: "content", children: "Content" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_markdown_editor.MarkdownEditor,
        {
          editorRef,
          name: "content",
          defaultValue: content || "",
          required: true
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_button.default,
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
