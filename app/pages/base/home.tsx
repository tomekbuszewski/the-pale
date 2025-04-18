import { Fragment, lazy } from "react";
import { useLoaderData } from "react-router";
import {
  BlogSection as BlogSectionFeature,
  HeroSection,
  WorksSection,
} from "@features";

const AboutSection = lazy(() => import("@features/AboutSection/AboutSection"));
const BlogSection = lazy(() => import("@features/BlogSection/BlogSection"));
const ClientsSection = lazy(
  () => import("@features/ClientsSection/ClientsSection"),
);
const ServicesSection = lazy(
  () => import("@features/ServicesSection/ServicesSection"),
);

import blogLoader from "@features/BlogSection/loader";

export function links() {
  const result: Record<string, string>[] = [];

  WorksSection.links.forEach(([mobile, desktop]) => {
    if (typeof mobile === "string" || typeof desktop === "string") {
      return;
    }

    result.push({
      rel: "preload",
      as: "image",
      type: "image/webp",
      href: mobile.src,
    });

    result.push({
      rel: "preload",
      as: "image",
      type: "image/webp",
      href: desktop.src,
    });
  });

  return result;
}

export async function loader() {
  const blog = await blogLoader({
    withContent: false,
    limit: 6,
    page: 1,
  });

  return { blog };
}

export default function Home() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <HeroSection.component />
      <WorksSection.component />
      <ServicesSection />
      <ClientsSection />
      {BlogSectionFeature.guard(blog) ? <BlogSection {...blog} /> : null}
      <AboutSection />
    </Fragment>
  );
}
