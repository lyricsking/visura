import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export default function Post() {
  const { slug } = useLoaderData<typeof loader>();
  return <>{slug}</>;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  let slug = params["slug"];
  return json({ slug });
};
