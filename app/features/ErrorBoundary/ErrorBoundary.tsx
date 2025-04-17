import { isRouteErrorResponse } from "react-router";
import { BaseLayout } from "@layouts/Main";

import { ErrorPage } from "@ui/organisms";

import type { Route } from "../../../.react-router/types/app/+types/root";

export default function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <BaseLayout>
      <ErrorPage>
        {import.meta.env.DEV ? (
          <>
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
              <pre className="w-full p-4 overflow-x-auto">
                <code>{stack}</code>
              </pre>
            )}
          </>
        ) : null}
      </ErrorPage>
    </BaseLayout>
  );
}
