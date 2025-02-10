import { Routes } from "@nav";
import { Text } from "@ui/atoms";
import { ServicesSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

import ConsultationsIcon from "./assets/consultations.svg?react";
import FrontendIcon from "./assets/frontend.svg?react";
import WebsiteIcon from "./assets/website.svg?react";

const items = [
  {
    title: translate("services-feature.website.title") as string,
    icon: <WebsiteIcon />,
    onClick: () => null,
    children: (translate("services-feature.website.copy") as string[]).map(
      (s, i) => <Text key={i}>{s}</Text>,
    ),
    additional: translate("services-feature.website.additional") as string[],
    link: Routes.website,
  },
  {
    title: "Front-end<br />Development",
    icon: <FrontendIcon />,
    onClick: () => null,
    link: Routes.frontend,
    children: (translate("services-feature.frontend.copy") as string[]).map(
      (s, i) => <Text key={i}>{s}</Text>,
    ),
    additional: translate("services-feature.frontend.additional") as string[],
  },
  {
    title: translate("services-feature.consultations.title") as string,
    icon: <ConsultationsIcon />,
    link: Routes.consulting,
    onClick: () => null,
    children: (
      translate("services-feature.consultations.copy") as string[]
    ).map((s, i) => <Text key={i}>{s}</Text>),
    additional: translate(
      "services-feature.consultations.additional",
    ) as string[],
  },
];

export default function ServicesSection() {
  return (
    <Main items={items} title={translate("services-feature.title") as string} />
  );
}
