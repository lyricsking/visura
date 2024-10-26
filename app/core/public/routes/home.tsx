import { json, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { PageMetadata } from "~/core/types/page";
import { renderPage } from "~/core/components/ui/render-page";
import { Route } from "~/core/types/route";
import Loading from "~/core/components/loading";
import { getAppContext } from "~/app";
import { useAppContext } from "~/core/utils/app-context";

export const loader = async (args: LoaderFunctionArgs) => {
  const app = await getAppContext();

  const homepagePath = app?.configs.app.homepage || "/";
  const route = app?.findRoute("app", homepagePath);

  let data: { path: string; data: any; metadata: PageMetadata | undefined } = {
    path: homepagePath,
    data: undefined,
    metadata: undefined,
  };

  if (route && !Array.isArray(route)) {
    data.path = route.path;
    // data.data = route.loader && route.loader({ ...args, app });
    data.metadata = route.page.metadata;
  }

  return json(data);
};

export default function Home() {
  const { data, path } = useLoaderData<typeof loader>();

  const app = useAppContext();

  const route = app?.findRoute("app", path) as Route | undefined;

  const pageContents = route?.page.content;
  if (route && pageContents) {
    for (const content of pageContents) {
      return renderPage(content, data);
    }
  }

  return <Loading />;
}
