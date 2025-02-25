import { Sections, StaticRoutes } from "@nav";
import { ServicePage } from "@ui/organisms";

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
import { Content } from "@features";

export default function WebDevelopment() {
  const translate = Content.hooks.useTranslate();

  const COPY = {
    TITLE: translate("services.feature.website.title"),
    INTRO: translate("services.feature.website.full.intro"),
    BODY: translate("services.feature.website.full.body"),
    PROCESS: [
      {
        title: translate(
          "services.feature.website.full.process.discovery.title",
        ),
        body: translate("services.feature.website.full.process.discovery.body"),
      },
      {
        title: translate("services.feature.website.full.process.design.title"),
        body: translate("services.feature.website.full.process.design.body"),
      },
      {
        title: translate("services.feature.website.full.process.coding.title"),
        body: translate("services.feature.website.full.process.coding.body"),
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
        title: translate("services.feature.website.full.card.design.title"),
        description: translate(
          "services.feature.website.full.card.design.body",
        ),
        more: {
          label: translate("services.feature.website.full.card.design.cta"),
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
        title: translate("services.feature.website.full.card.tech.title"),
        description: translate("services.feature.website.full.card.tech.body"),
        more: {
          label: translate("services.feature.website.full.card.tech.cta"),
          href: StaticRoutes.tech,
        },
      },
      {
        icons: [github, gitlab, cc, bitbucket, netlify, tower, vercel, tower],
        title: translate("services.feature.website.full.card.repo.title"),
        description: translate("services.feature.website.full.card.repo.body"),
      },
    ],
    CTA: translate("services.feature.website.full.cta"),
    WHAT_YOU_GET: translate("services.feature.website.full.what-do-you-get"),
  };
  return (
    <ServicePage
      title={COPY.TITLE}
      intro={COPY.INTRO}
      body={COPY.BODY}
      processItems={COPY.PROCESS}
      cards={COPY.CARDS}
      process={translate("services.feature.process")}
      whatYouGet={COPY.WHAT_YOU_GET}
    />
  );
}
