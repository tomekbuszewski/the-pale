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
  TITLE: translate("services.feature.frontend.title") as string,
  INTRO: translate("services.feature.frontend.intro") as string,
  BODY: translate(
    "services.feature.frontend.body",
    EXP_YEARS.toString(),
  ) as string[],
  PROCESS: [
    {
      title: translate(
        "services.feature.frontend.process.design.title",
      ) as string,
      body: translate(
        "services.feature.frontend.process.design.description",
      ) as string,
    },
    {
      title: translate(
        "services.feature.frontend.process.technical.title",
      ) as string,
      body: translate(
        "services.feature.frontend.process.technical.description",
      ) as string,
    },
    {
      title: translate(
        "services.feature.frontend.process.implementation.title",
      ) as string,
      body: translate(
        "services.feature.frontend.process.implementation.description",
      ) as string,
    },
  ],

  CARDS: [
    {
      title: translate("services.feature.frontend.card.design.title") as string,
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
      ) as string,
    },
    {
      title: translate(
        "services.feature.frontend.card.technical.title",
      ) as string,
      icons: [astro, css, html, js, ts, react, router, sass, tailwind, next],
      description: translate(
        "services.feature.frontend.card.technical.description",
      ) as string,
    },
    {
      title: translate(
        "services.feature.frontend.card.implementation.title",
      ) as string,
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
      ) as string,
    },
  ],
};

export default function Frontend() {
  return (
    <ServicePage
      title={COPY.TITLE}
      intro={COPY.INTRO}
      body={COPY.BODY}
      process={translate("services.feature.process") as string}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
    />
  );
}
