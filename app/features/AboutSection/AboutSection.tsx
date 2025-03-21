import { EXP_YEARS } from "@contact";
import { AboutSection as Main } from "@ui/organisms";
import { Content } from "@features";

export default function AboutSection() {
  const translate = Content.hooks.useTranslate();

  return <Main>{translate("about.feature.data", String(EXP_YEARS))}</Main>;
}
