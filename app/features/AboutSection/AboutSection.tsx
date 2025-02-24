import { EXP_YEARS } from "@contact";
import { AboutSection as Main } from "@ui/organisms";
import { useTranslate } from "@hooks";

export default function AboutSection() {
  const translate = useTranslate();

  return <Main>{translate("about.feature.data", String(EXP_YEARS))}</Main>;
}
