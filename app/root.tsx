import stylesheet from "tailwind.css?url";

import {
  LoaderFunction,
  json,
  LinksFunction,
  MetaFunction,
} from "@remix-run/node";
import {
  useRouteLoaderData,
  Meta,
  Links,
  ScrollRestoration,
  Scripts,
  Outlet,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import { useEffect } from "react";

import { cn } from "./core/utils/util";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { withContext } from "./core/utils/context-loader";
import { applyDiscount } from "./core/tempPlugins/SubscriptionBox/Order/server/cart.server";
import { Config } from "./core/config";
import { Toaster } from "./core/components/toaster";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export type LoaderData = {
  //theme: Theme | null;
  config: Config["app"];
};

// read the state from the cookie
export const loader = async () => {
  const app = await withContext();
  //const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    config: app!.configs.app,
  };

  return json(data);
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  // Access the appConfig from the loader's returned data
  if (data && data.config) {
    return [{ title: "" }, { name: "description", content: "" }];
  }

  return [
    { title: "Title" },
    {
      name: "description",
      content: "Description",
    },
  ];
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData("root") as LoaderData;

  return (
    // <ThemeProvider theme={data?.theme}>
    <html
      lang="en"
      // className={cn(data?.theme)}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-base-100 text-neutral max-h-screen max-w-full overflow-x-hidden">
        {children}
        <Toaster />
        <ScrollRestoration
          getKey={(location) => {
            return location.pathname;
          }}
        />
        <Scripts />
      </body>
    </html>
    // </ThemeProvider>
  );
}

export default function App() {
  const data = useLoaderData() as LoaderData;

  return <Outlet context={{ config: data?.config }} />;
}

export function ErrorBoundary() {
  const error: any = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  }

  return (
    <>
      <h1>Error!</h1>
      <p>{error?.message ?? "Unknown error"}</p>
    </>
  );
}
