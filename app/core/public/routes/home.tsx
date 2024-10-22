import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { AppContext, appContext } from "~/app";
import renderBlock from "~/core/block";
import { useApp } from "~/core/hooks/use-app";
import { withContext } from "~/core/utils/context-loader";

export const loader: LoaderFunction = withContext(
  async ({ app, params, request }) => {
    const homepagePath = app.configs.app.homepage;
    const route = app?.findRoute("app", homepagePath);

    const defaultBlock = {};
    const data: any = { block: defaultBlock };

    if (route && !Array.isArray(route)) {
      const routeBlock = await route.getBlock();
       data["block"] = routeBlock;
    }

    return json(data);
  }
);

export default function Home() {
  const { block } = useLoaderData<typeof loader>();
  const { app } = useApp();

  return renderBlock(block);
}
