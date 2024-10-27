import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { match } from "path-to-regexp";
import NotFound from "./not-found";
import { getAppContext } from "~/app";

const NOT_FOUND_PATH = "not-found";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const path = new URL(request.url).pathname;
  const app = await getAppContext();

  const matchedRoute = app.routes?.find(route => {
    const matchRoute = match(route.path, { decode: decodeURIComponent });
    return matchRoute(path);
  });

  if (matchedRoute) {
    const matchResult = match(matchedRoute.path, { decode: decodeURIComponent })(path);
    const data = matchedRoute.loader ? await matchedRoute.loader({ request, app }) : null;

    return json({
      path: matchedRoute.path,
      params: matchResult.params,
      data,
      content: matchedRoute.content,
    });
  }

  // If no route matched, return default not-found response
  return json({ path: NOT_FOUND_PATH, data: {} });
};
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const path = new URL(request.url).pathname;
  const app = await getAppContext();

  const matchedRoute = app.routes?.find(route => {
    const matchRoute = match(route.path, { decode: decodeURIComponent });
    return matchRoute(path);
  });

  if (matchedRoute) {
    const matchResult = match(matchedRoute.path, { decode: decodeURIComponent })(path);
    const data = matchedRoute.loader ? await matchedRoute.loader({ request, app }) : null;

    return json({
      path: matchedRoute.path,
      params: matchResult.params,
      data,
      content: matchedRoute.content,
    });
  }

  // If no route matched, return default not-found response
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
