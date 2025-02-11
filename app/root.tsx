import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "react-router";
import {
  Analytics as AnalyticsFeature,
  ErrorBoundary as ErrorBoundaryFeature,
} from "@features";

import type { ReactNode } from "react";

import type { Route } from "./+types/root";

import "@fontsource-variable/geist-mono";
import "@fontsource-variable/bricolage-grotesque";

import stylesheet from "./app.scss?url";

export const links: Route.LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
  {
    rel: "icon",
    sizes: "96x96",
    type: "image/png",
    href: "/favicon-96x96.png",
  },
  {
    rel: "icon",
    type: "image/svg+xml",
    href: "/favicon.svg",
  },
  {
    rel: "shortcut icon",
    href: "/favicon.ico",
  },
  {
    rel: "apple-touch-icon",
    href: "/apple-touch-icon.png",
  },
  {
    rel: "manifest",
    href: "/site.webmanifest",
  },
];

export function loader() {
  const gaID = import.meta.env.VITE_GA as string;
  if (!gaID) {
    return;
  }

  return gaID;
}

export function Layout({ children }: { children: ReactNode }) {
  const gaID = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <AnalyticsFeature.component id={gaID} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export const ErrorBoundary = ErrorBoundaryFeature.component;
