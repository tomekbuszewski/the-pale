import { Fragment } from "react";
import { useLoaderData } from "react-router";
import {
  AboutSection,
  BlogSection,
  ClientsSection,
  FooterSection,
  HeaderSection,
  HeroSection,
  ServicesSection,
  WorksSection,
} from "@features";
import { MainWrapper } from "@ui/atoms";

export function meta() {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export async function loader() {
  return {
    blog: await BlogSection.loader({ withContent: false, limit: 6, page: 1 }),
  };
}

export default function Home() {
  const { blog } = useLoaderData<typeof loader>();

  return (
    <Fragment>
      <HeaderSection.component />
      <MainWrapper>
        <HeroSection.component />
        <WorksSection.component />
        <ServicesSection.component />
        <ClientsSection.component />
        {BlogSection.guard(blog) ? <BlogSection.component {...blog} /> : null}
        <AboutSection.component />
      </MainWrapper>
      <FooterSection.component />
    </Fragment>
  );
}
