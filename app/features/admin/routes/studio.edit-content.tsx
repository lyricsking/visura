import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import ContentForm from "~/features/content/components/content-form";
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

  const content: Omit<IContentType, "_id"> = {
    name: schemaName,
    fields: fields,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  let res;

  const { contentTypeId } = params;

  const apiURL = new URL("http://localhost:3000/api/content-type");
  if (contentTypeId) {
    apiURL.searchParams.set("id", contentTypeId);

    res = await fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    res = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await res.json();
  console.log(JSON.stringify(data));

  return data;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const currentUrl = new URL(request.url);

  let content: Omit<IContentType, "_id"> = {
    name: "",
    fields: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { contentTypeId } = params;
  if (contentTypeId) {
    // Fetch page if pageId is provided and valid
    const pageReqUrl = new URL("http://localhost:3000/api/content-type");
    pageReqUrl.searchParams.set("id", contentTypeId);

    content = (await (await fetch(pageReqUrl, { method: "GET" })).json())?.[
      "data"
    ];
  }

  return { data: content };
}

export default function StudioEditContent() {
  const { data } = useLoaderData<typeof loader>();

  return <ContentForm content={data as IContentType} />;
}
