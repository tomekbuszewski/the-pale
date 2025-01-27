import type { Meta } from "@storybook/react";

import AboutSection from "./AboutSection";
const data =
  "With 18 years of experience in web, I partner with clients across\n" +
  "      industries to bring their ideas to life. <br/> I combine technical\n" +
  "      expertise with experience to create innovative websites that drive\n" +
  "      results.";

export const Primary = () => (
  <div style={{ height: "400dvh", marginTop: "100vh" }}>
    <AboutSection>{data}</AboutSection>
  </div>
);

export default {
  title: "Organisms/AboutSection",
  component: AboutSection,
} satisfies Meta<typeof AboutSection>;
