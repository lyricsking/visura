import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation, useSubmit } from "@remix-run/react";
import { FormEvent, useState } from "react";
import ContentForm from "~/features/content/components/content-form";
import { useContent } from "~/features/content/components/content-provider";
import { Field, IContentType } from "~/features/content/types/content";
import formDataToObject from "~/shared/utils/form-data-to-object";

export async function action({ request }: ActionFunctionArgs) {
  const formDataObject = formDataToObject(await request.formData());

  console.log(formDataObject);

  const schemaName = formDataObject["schemaName"];
  const fieldNames = formDataObject["name"];
  const fieldTypes = formDataObject["type"];
  const fieldRequired = formDataObject["fieldRequired"];

  const fields: Field[] = [];
  Array.isArray(fieldNames)
    ? fieldNames.forEach((value, index) => {
        if (typeof value === "string" && value.length > 0)
          fields.push({
            name: value,
            type: fieldTypes[index],
            required: !!fieldRequired[index],
          });
      })
    : typeof fieldNames === "string" && fieldNames.length > 0
    ? fields.push({
        name: fieldNames,
        type: fieldTypes,
        required: !!fieldRequired,
      })
    : null;

  const content: IContentType = {
    name: schemaName,
    fields: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  console.log(content);

  return "";
}

export const loader = ({ params }: LoaderFunctionArgs) => {
  const { contentId } = params;

  const content: IContentType = {
    name: "",
    fields: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return { content: content };
};

export default function StudioEditContent() {
  const { content } = useLoaderData<typeof loader>();

  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    const formData = formDataToObject(new FormData(event.currentTarget));

    const schemaName = formData["schemaName"];
    const names = formData["name"];
    const types = formData["type"];
    const requireds = !!formData["required"];

    const content: IContentType = {
      name: schemaName,
      fields: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    submit({}, { method: "post", encType: "application/json" });
  }

  return <ContentForm content={content} />;
}
