import { useLoaderData } from "react-router";
import { CaseStudies } from "@features";

import type { Route } from "../../../.react-router/types/app/pages/pl/+types/uses";

export function loader({ params }: Route.LoaderArgs) {
  if (params.slug) {
    return params.slug;
  }

  // eslint-disable-next-line @typescript-eslint/only-throw-error
  throw new Response("Not found", { status: 404 });
}

export default function Works() {
  const slug = useLoaderData<typeof loader>();

  if (!slug) {
    return null;
  }

  const { component: Component } = CaseStudies.component(slug);

  if (Component) {
    return <Component />;
  }

  return null;
}
