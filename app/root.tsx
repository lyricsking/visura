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
} from "@remix-run/react";
import { useEffect } from "react";

import { getThemeSession } from "./Theme/theme.server";
import { Theme, ThemeProvider } from "./Theme/theme.provider";
import { config } from "@/config";

import { cn } from "./utils/util";
import { Toaster } from "./components/toaster";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export type LoaderData = {
  theme: Theme | null;
};

// read the state from the cookie
export const loader: LoaderFunction = async ({ request }) => {
  const themeSession = await getThemeSession(request);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return json(data);
};

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export const meta: MetaFunction = () => {
  return [
    { title: config.appName },
    { name: "description", content: config.description },
  ];
};
export function Layout({ children }: { children: React.ReactNode }) {
  const data = useRouteLoaderData("root") as LoaderData;

  useEffect(() => {
    JSON.stringify(data, null, 2);
  }, [data]);

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
  return <Outlet />;
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
