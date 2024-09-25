import { LoaderFunction } from "@remix-run/node";
import { match } from "path-to-regexp";

export let loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const path = url.pathname; // e.g., "/blog/posts/first-post"
  
  const pluginRoutes = findRoute("app");
  
  if(pluginRoutes){
  // Try matching the URL with the registered plugin paths
  for (let route in pluginRoutes) {
    const matchRoute = match(route.path, { decode: decodeURIComponent });
    const matchResult = matchRoute(path);

    if (matchResult) {
      const { path, params } = matchResult;
      // Do something with the matched params
      // e.g., load the post based on postId
      const data = route.loader(args);
      return { path: route.path, data: data, params };
    }
  }}
  
  // If no route matched, return 404
  //throw new Response("Not Found", { status: 404 });
  // Return default path
  return { path: "not-found", data: {}};
  
};


export default function CatchAll() {
  const {path, data, params} = useLoaderData<typeof loader>();
  
  const route = findRoute("app", path);
  const Component = route.component;
  
  return <Component data={data}/>
}