import { TextRotate } from "@ui/atoms";
import { HeroSection as Main } from "@ui/organisms";
import { translate } from "@utils/translate";

const COPY = {
  BODY: translate("hero.feature.copy"),
  TITLE: translate("hero.feature.title"),
  FIRST_LINE: translate("hero.feature.first-line"),
  KEYWORDS: translate("hero.feature.keywords"),
  SECOND_LINE: translate("hero.feature.second-line"),
};

export default function HeroSection() {
  return (
    <Main title={COPY.TITLE} copy={COPY.BODY}>
      <>
        {COPY.FIRST_LINE}
        <TextRotate staggerFrom="last" texts={COPY.KEYWORDS} />
        <br />
        {COPY.SECOND_LINE}
      </>
    </Main>
  );
}
