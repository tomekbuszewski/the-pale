import { EXP_YEARS } from "@contact";
import { ServicePage } from "@ui/organisms";
import { translate } from "@utils/translate";

import {
  astro,
  css,
  designer,
  figma,
  html,
  jest,
  js,
  next,
  photo,
  puppeteer,
  react,
  router,
  sass,
  sketch,
  storybook,
  tailwind,
  ts,
  vite,
  vitest,
} from "../icons";

const COPY = {
  TITLE: translate("services.feature.frontend.title"),
  INTRO: translate("services.feature.frontend.intro"),
  BODY: translate("services.feature.frontend.body", EXP_YEARS.toString()),
  PROCESS: [
    {
      title: translate("services.feature.frontend.process.design.title"),
      body: translate("services.feature.frontend.process.design.description"),
    },
    {
      title: translate("services.feature.frontend.process.technical.title"),
      body: translate(
        "services.feature.frontend.process.technical.description",
      ),
    },
    {
      title: translate(
        "services.feature.frontend.process.implementation.title",
      ),
      body: translate(
        "services.feature.frontend.process.implementation.description",
      ),
    },
  ],

  CARDS: [
    {
      title: translate("services.feature.frontend.card.design.title"),
      icons: [
        figma,
        sketch,
        photo,
        designer,
        figma,
        sketch,
        photo,
        designer,
        figma,
        sketch,
        photo,
        designer,
      ],
      description: translate(
        "services.feature.frontend.card.design.description",
      ),
    },
    {
      title: translate("services.feature.frontend.card.technical.title"),
      icons: [astro, css, html, js, ts, react, router, sass, tailwind, next],
      description: translate(
        "services.feature.frontend.card.technical.description",
      ),
    },
    {
      title: translate("services.feature.frontend.card.implementation.title"),
      icons: [
        astro,
        css,
        html,
        jest,
        js,
        ts,
        react,
        router,
        sass,
        tailwind,
        storybook,
        vite,
        vitest,
        puppeteer,
      ],
      description: translate(
        "services.feature.frontend.card.implementation.description",
      ),
    },
  ],
};

export default function Frontend() {
  return (
    <ServicePage
      title={COPY.TITLE}
      intro={COPY.INTRO}
      body={COPY.BODY}
      process={translate("services.feature.process")}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
    />
  );
}
