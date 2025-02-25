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
  Content,
} from "@features";
import brico from "@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wght-normal.woff2?url";
import geist from "@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2?url";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

import type { ReactNode } from "react";

import type { Route } from "./+types/root";

import "@fontsource-variable/geist-mono";
import "@fontsource-variable/bricolage-grotesque";

import stylesheet from "./app.scss?url";

export const links: Route.LinksFunction = () => [
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
  {
    rel: "preload",
    href: brico,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: geist,
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function loader({ request }: Route.LoaderArgs) {
  const ga = (import.meta.env.VITE_GA as string) ?? process.env.VITE_GA;
  const language = Content.functions.detectLanguageFromUrl(request);

  return { ga, language };
}

export function Layout({ children }: { children: ReactNode }) {
  const { ga, language } = useLoaderData<typeof loader>();

  return (
    <Content.context.Provider value={language}>
      <html lang={language}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body>
          <Content.components.LanguageDetect />
          {children}
          <ScrollRestoration />
          <Scripts />
          <AnalyticsFeature.component id={ga} />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </Content.context.Provider>
  );
}

export default function App() {
  return <Outlet />;
}

export const ErrorBoundary = ErrorBoundaryFeature.component;
