import { Fragment } from "react";
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
    blog: await BlogSection.loader(),
  };
}

export default function Home() {
  return (
    <Fragment>
      <HeaderSection.component />
      <MainWrapper>
        <HeroSection.component />
        <WorksSection.component />
        <ServicesSection.component />
        <ClientsSection.component />
        <AboutSection.component />
      </MainWrapper>
      <FooterSection.component />
    </Fragment>
  );
}
