import { LoaderFunction } from "@remix-run/node";
import { match } from "path-to-regexp";

// Example of registered plugin paths
const pluginRoutes = {
  "blog": "/blog/posts/:postId"
};

export let loader: LoaderFunction = async ({ params, request }) => {
  const url = new URL(request.url);
  const path = url.pathname; // e.g., "/blog/posts/first-post"
  
  // Try matching the URL with the registered plugin paths
  for (let key in pluginRoutes) {
    const route = pluginRoutes[key];
    const matchRoute = match(route, { decode: decodeURIComponent });
    const matchResult = matchRoute(path);

    if (matchResult) {
      const { params } = matchResult;
      // Do something with the matched params
      // e.g., load the post based on postId
      return { matched: true, params };
    }
  }

  // If no route matched, return 404
  throw new Response("Not Found", { status: 404 });
};
