import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { withContext } from "~/utils/context-loader";
import renderBlock from "~/block";

export const loader: LoaderFunction = withContext(
  async ({ app, params, request }) => {
    const homepagePath = app.configs.homepage;
    const route = app?.findRoute("app", homepagePath);

    console.log(homepagePath);

    const defaultBlock = {};
    const data: any = { block: defaultBlock };

    if (route && !Array.isArray(route)) {
      const routeBlock = route.getBlock();
      data["block"] = routeBlock;
    }

    return json(data);
  }
);

export default function Home() {
  const { block } = useLoaderData<typeof loader>();
  return renderBlock(block);
}
