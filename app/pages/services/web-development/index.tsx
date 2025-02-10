import { Sections, StaticRoutes } from "@nav";
import { ServicePage } from "@ui/organisms";
import { translate } from "@utils/translate";

import {
  alacritty,
  astro,
  bitbucket,
  cc,
  css,
  designer,
  directus,
  docker,
  figma,
  git,
  github,
  gitlab,
  html,
  jest,
  js,
  netlify,
  next,
  notebook,
  photo,
  procreate,
  puppeteer,
  react,
  router,
  sass,
  sketch,
  storybook,
  tailwind,
  tower,
  ts,
  vercel,
  vite,
  vitest,
} from "../icons";

export const COPY = {
  TITLE: translate("services.feature.website.title") as string,
  INTRO: translate("services.feature.website.full.intro") as string,
  BODY: translate("services.feature.website.full.body") as string,
  PROCESS: [
    {
      title: translate(
        "services.feature.website.full.process.discovery.title",
      ) as string,
      body: translate(
        "services.feature.website.full.process.discovery.body",
      ) as string,
    },
    {
      title: translate(
        "services.feature.website.full.process.design.title",
      ) as string,
      body: translate(
        "services.feature.website.full.process.design.body",
      ) as string,
    },
    {
      title: translate(
        "services.feature.website.full.process.coding.title",
      ) as string,
      body: translate(
        "services.feature.website.full.process.coding.body",
      ) as string,
    },
  ],
  CARDS: [
    {
      icons: [
        figma,
        designer,
        sketch,
        procreate,
        photo,
        notebook,
        figma,
        designer,
        sketch,
        procreate,
        photo,
        notebook,
      ],
      title: translate(
        "services.feature.website.full.card.design.title",
      ) as string,
      description: translate(
        "services.feature.website.full.card.design.body",
      ) as string[],
      more: {
        label: translate(
          "services.feature.website.full.card.design.cta",
        ) as string,
        href: "/#" + Sections.works,
      },
    },
    {
      icons: [
        vite,
        vitest,
        vercel,
        alacritty,
        astro,
        css,
        html,
        docker,
        directus,
        storybook,
        git,
        tailwind,
        jest,
        js,
        ts,
        next,
        sass,
        router,
        react,
        puppeteer,
      ],
      title: translate(
        "services.feature.website.full.card.tech.title",
      ) as string,
      description: translate(
        "services.feature.website.full.card.tech.body",
      ) as string[],
      more: {
        label: translate(
          "services.feature.website.full.card.tech.cta",
        ) as string,
        href: StaticRoutes.tech,
      },
    },
    {
      icons: [github, gitlab, cc, bitbucket, netlify, tower, vercel, tower],
      title: translate(
        "services.feature.website.full.card.repo.title",
      ) as string,
      description: translate(
        "services.feature.website.full.card.repo.body",
      ) as string[],
    },
  ],
  CTA: translate("services.feature.website.full.cta") as string,
};

export default function WebDevelopment() {
  return (
    <ServicePage
      title={COPY.TITLE}
      intro={COPY.INTRO}
      body={COPY.BODY}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
      process={translate("services.feature.process") as string}
    />
  );
}
