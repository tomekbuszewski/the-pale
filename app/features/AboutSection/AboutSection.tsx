import { EXP_YEARS } from "@contact";
import { AboutSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

export default function AboutSection() {
  return <Main>{translate("about.feature.data", String(EXP_YEARS))}</Main>;
}
