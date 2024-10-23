import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import DefaultHome from "./default-home";
import { PageMetadata } from "~/core/types/page";
import { app } from "~/entry.server";

export const loader = async ({}: LoaderFunctionArgs) => {
  console.log(app);

  const homepagePath = app?.configs.app.homepage || "/";
  const route = app?.findRoute("app", homepagePath);

  let data: { path: string; data: any; metadata: PageMetadata | undefined } = {
    path: homepagePath,
    data: undefined,
    metadata: undefined,
  };

  if (route && !Array.isArray(route)) {
    data.path = route.path;
    // data.data = route.loader && route.loader();
    data.metadata = route.page.metadata;
  }
  console.log(data.path);

  return json(data);
};

export default function Home() {
  const { data, path } = useLoaderData<typeof loader>();

  // const route = app?.findRoute("app", path) as Route | undefined;

  // useEffect(() => {
  //   alert(JSON.stringify({ path, route, pageContents }, null, 2));
  // }, []);

  // const pageContents = route?.page.content;
  // if (route && pageContents) {
  //   for (const content of pageContents) {
  //     return renderPage(content, data);
  //   }
  // }

  return <DefaultHome />;
}
