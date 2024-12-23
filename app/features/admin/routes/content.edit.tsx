import { ActionFunctionArgs, LoaderFunctionArgs } from "react-router";
import { useLoaderData } from "react-router";
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

  const { id } = params;

  if (id && id !== "new") {
    const apiURL = new URL(`http://localhost:3000/api/content-type/${id}`);

    res = await fetch(apiURL, {
      method: "PUT",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
  } else {
    const apiURL = new URL("http://localhost:3000/api/content-type");
    res = await fetch(apiURL, {
      method: "POST",
      body: JSON.stringify(content),
      headers: { "Content-Type": "application/json" },
    });
  }

  const data = await res.json();

  return data;
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  let content: Omit<IContentType, "_id"> = {
    name: "",
    fields: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const { id } = params;
  if (id && id !== "new") {
    // Fetch page if id is provided and valid
    const pageReqUrl = new URL(`http://localhost:3000/api/content-type/${id}`);

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
