import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import NotFound from "./not-found";
import { getAppContext } from "~/app";

const NOT_FOUND_PATH = "not-found";

export const loader = async (args: LoaderFunctionArgs) => {
  const { request } = args;

  const url = new URL(request.url);

  const path = url.pathname; // e.g., "/blog/posts/first-post"

  const app = await getAppContext();

  const pluginRoutes = app.routes;

  if (pluginRoutes && Array.isArray(pluginRoutes)) {
    // Try matching the URL with the registered plugin paths
    for (let route of pluginRoutes) {
      const matchRoute = match(route.path, { decode: decodeURIComponent });
      const matchResult = matchRoute(path);

      if (matchResult) {
        const { path, params } = matchResult;

        // Do something with the matched params
        // e.g., load the post based on postId
        const data = route.loader && (await route.loader({ ...args, app }));

        return json({
          path: route.path,
          params,
          data: data,
          content: route?.content,
        });
      }
    }
  }

  // If no route matched, return 404
  //throw new Response("Not Found", { status: 404 });
  // Return default path
  return json({ path: NOT_FOUND_PATH, data: {} });
};

export default function CatchAll() {
  const { path } = useLoaderData<typeof loader>();

  // useEffect(() => {
  //   alert(componentPath);
  // }, []);

  // return <div dangerouslySetInnerHTML={{ __html: componentPath }} />;
  // if (componentPath && pathname !== NOT_FOUND_PATH) {
  //   // Use React.lazy to dynamically import the component
  //   const DynamicComponent = React.lazy(
  //     () => import(/* @vite-ignore */ `/app/${componentPath}`)
  //   );

  //   return (
  //     <Suspense fallback={<div>Loading component...</div>}>
  //       <DynamicComponent {...data} pathname={pathname} />
  //     </Suspense>
  //   );
  // }

  return <NotFound />;
}
