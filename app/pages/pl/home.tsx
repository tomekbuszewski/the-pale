import { Fragment } from "react";
import {
  AboutSection,
  ClientsSection,
  HeroSection,
  ServicesSection,
  WorksSection,
} from "@features";

export default function Home() {
  return (
    <Fragment>
      <HeroSection.component />
      <WorksSection.component />
      <ServicesSection.component />
      <ClientsSection.component />
      <AboutSection.component />
    </Fragment>
  );
}
