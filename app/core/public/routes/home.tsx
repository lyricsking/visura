import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AppContext, appContext } from "~/app";
import renderBlock from "~/core/block";
import { useApp } from "~/core/hooks/use-app";
import { withContext } from "~/core/utils/context-loader";
import DefaultHome from "./default-home";
import { PageMetadata, Page } from "~/core/types/page";
import { Route } from "~/core/types/route";

export const loader = async () => {
  const app = await withContext();

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

  return json(data);
};

export default function Home() {
  const { data, path } = useLoaderData<typeof loader>();
  const { app } = useApp();

  const route = app?.findRoute("app", path) as Route | undefined;

  const pageContents = route?.page.content;
  if (route && pageContents) {
    for (const content of pageContents) {
      switch (content.type) {
        case "block":
          return renderBlock(content.value);
        case "markdown":
          return "Not yet implemented";
        case "component":
          const Tag = content.value;
          return <Tag {...data} />;
        default:
          break;
      }
    }
  }

  return <DefaultHome />;
}
