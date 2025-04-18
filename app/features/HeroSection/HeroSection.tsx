import { Content } from "@features";

import { TextRotate } from "@ui/atoms";
import { HeroSection as Main } from "@ui/organisms";

export default function HeroSection() {
  const translate = Content.hooks.useTranslate();

  const COPY = {
    BODY: translate("hero.feature.copy"),
    TITLE: translate("hero.feature.title"),
    FIRST_LINE: translate("hero.feature.first-line"),
    KEYWORDS: translate("hero.feature.keywords"),
    SECOND_LINE: translate("hero.feature.second-line"),
  };

  return (
    <Main
      title={COPY.TITLE}
      copy={COPY.BODY}
      itemScope
      itemType="https://schema.org/WebPageElement"
    >
      <>
        {COPY.FIRST_LINE}
        <TextRotate staggerFrom="last" texts={COPY.KEYWORDS} />
        <br />
        {COPY.SECOND_LINE}
      </>
    </Main>
  );
}
