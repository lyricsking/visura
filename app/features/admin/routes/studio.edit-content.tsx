import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import {
  useFetcher,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "@remix-run/react";
import { FileSliders } from "lucide-react";
import { log } from "node:console";
import { FormEvent, useState } from "react";
import ContentForm from "~/features/content/components/content-form";
import { useContent } from "~/features/content/components/content-provider";
import { Field, IContentType } from "~/features/content/types/content";
import formDataToObject from "~/shared/utils/form-data-to-object";

export async function action({ params, request }: ActionFunctionArgs) {
  const formDataObject = formDataToObject(await request.formData());

  const schemaName = formDataObject["schemaName"];
  const fieldNames = formDataObject["name"];
  const fieldTypes = formDataObject["type"];
  const fieldRequired = formDataObject["required"];

  const fields: Field[] = [];
  Array.isArray(fieldNames)
    ? fieldNames.forEach((value, index) => {
        if (typeof value === "string" && value.length > 0)
          fields.push({
            name: value,
            type: fieldTypes[index],
            required: fieldRequired[index] ? true : false,
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
    fields: fields,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let res;

  const apiURL = new URL("http://localhost:3000/api/content-type");
  const { contentId } = params;
  if (contentId) {
    apiURL.searchParams.set("id", contentId);

    res = await fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
  }
  res = await fetch(apiURL, {
    method: "POST",
    body: JSON.stringify(content),
    headers: { "Content-Type": "application/json" },
  });

  const data = await res.json();

  console.log(data);

  return data;
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

  return <ContentForm content={content} />;
}
