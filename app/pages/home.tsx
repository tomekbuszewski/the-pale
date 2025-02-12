import { Fragment } from "react";
import { useLoaderData } from "react-router";
import {
  // AboutSection,
  BlogSection,
  ClientsSection,
  HeroSection,
  ServicesSection,
  WorksSection,
} from "@features";
import blogLoader from "@features/BlogSection/loader.server";

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
      <ServicesSection.component />
      <ClientsSection.component />
      {BlogSection.guard(blog) ? <BlogSection.component {...blog} /> : null}
      {/*<AboutSection.component />*/}
    </Fragment>
  );
}
