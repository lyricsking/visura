import stylesheet from "tailwind.css?url";

import { json, LinksFunction, MetaFunction } from "@remix-run/node";
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

import { Toaster } from "./components/toaster";
import { getAppContext } from "./app";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];
export type LoaderData = {
  //theme: Theme | null;
  config: any;
};

// read the state from the cookie
export const loader = async () => {
  //const themeSession = await getThemeSession(request);
  const app = await getAppContext();
  const data: LoaderData = {
    config: {},
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
