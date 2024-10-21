import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withContext } from "~/utils/context-loader";
import renderBlock from "~/block";
import { useEffect } from "react";
import { appContext } from "~/app";
import { useApp } from "~/hooks/use-app";

export const loader: LoaderFunction = withContext(
  async ({ app, params, request }) => {
    const homepagePath = app.configs.homepage;
    const route = app?.findRoute("app", homepagePath);

    console.log(app);

    const defaultBlock = {};
    const data: any = { block: defaultBlock };
    return json(data);

    // if (route && !Array.isArray(route)) {
    //   const routeBlock = await route.getBlock();
    //   data["block"] = routeBlock;
    // }

    // return json(data);
  }
);

export default function Home() {
  const app = useApp();

  return <>{JSON.stringify(app)}</>;

  const { block } = useLoaderData<typeof loader>();
  return renderBlock(block);
}
