import stylesheet from "tailwind.css?url";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useRouteError,
  useRouteLoaderData,
} from "@remix-run/react";
import clsx from "clsx";
import { getThemeSession } from "./Theme/theme.server";
import { Theme, ThemeProvider } from "./Theme/theme.provider";

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

export function Layout({ children }: { children: React.ReactNode }) {
  const { theme } = useRouteLoaderData("root") as LoaderData;

  return (
    <ThemeProvider theme={theme}>
      <html lang="en" className={clsx(theme)}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="bg-base-100 text-neutral">
          {children}
          <ScrollRestoration
            getKey={(location) => {
              return location.pathname;
            }}
          />
          <Scripts />
        </body>
      </html>
    </ThemeProvider>
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
