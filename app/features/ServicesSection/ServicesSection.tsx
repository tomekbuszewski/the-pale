import { Routes } from "@nav";
import { Text } from "@ui/atoms";
import { ServicesSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

import ConsultationsIcon from "./assets/consultations.svg?react";
import FrontendIcon from "./assets/frontend.svg?react";
import WebsiteIcon from "./assets/website.svg?react";

const items = [
  {
    title: translate("services.feature.website.short-title"),
    icon: <WebsiteIcon />,
    onClick: () => null,
    children: translate("services.feature.website.copy").map((s, i) => (
      <Text key={i}>{s}</Text>
    )),
    additional: translate("services.feature.website.additional"),
    link: Routes.website,
  },
  {
    title: translate("services.feature.frontend.title"),
    icon: <FrontendIcon />,
    onClick: () => null,
    link: Routes.frontend,
    children: translate("services.feature.frontend.copy").map((s, i) => (
      <Text key={i}>{s}</Text>
    )),
    additional: translate("services.feature.frontend.additional"),
  },
  {
    title: translate("services.feature.consultations.short-title"),
    icon: <ConsultationsIcon />,
    link: Routes.consulting,
    onClick: () => null,
    children: translate("services.feature.consultations.copy").map((s, i) => (
      <Text key={i}>{s}</Text>
    )),
    additional: translate("services.feature.consultations.additional"),
  },
];

export default function ServicesSection() {
  return <Main items={items} title={translate("services.feature.title")} />;
}
