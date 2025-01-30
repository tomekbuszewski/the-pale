import { Fragment } from "react";
import { useLoaderData } from "react-router";
import {
  AboutSection,
  BlogSection,
  ClientsSection,
  Contact,
  HeroSection,
  ServicesSection,
  WorksSection,
} from "@features";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return {
    blog: await BlogSection.loader({
      withContent: false,
      limit: 6,
      page: 1,
    }),
  };
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
      <AboutSection.component />
      <Contact.component />
    </Fragment>
  );
}
