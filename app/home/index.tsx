import { json, LoaderFunctionArgs, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import pkg from "../../package.json";
import Hero from "./components/hero";

export const meta: MetaFunction = () => {
  return [
    { title: pkg.name },
    { name: "description", content: pkg.description },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";

  return json({ q });
};

export default function Home() {
  const { q } = useLoaderData<typeof loader>();

  return (
    <div className="w-full">
      <Hero />
    </div>
  );
}
