import { translate } from "@utils/translate";

import astro from "../icons/astro.png";
import bitbucket from "../icons/bitbucket.png";
import cc from "../icons/cc.png";
import css from "../icons/css.png";
import designer from "../icons/designer.png";
import directus from "../icons/directus.png";
import docker from "../icons/docker.png";
import figma from "../icons/figma.png";
import git from "../icons/git.png";
import github from "../icons/github.png";
import gitlab from "../icons/gitlab.png";
import html from "../icons/html.png";
import jest from "../icons/jest.png";
import js from "../icons/js.png";
import netlify from "../icons/netlify.png";
import next from "../icons/next.png";
import notebook from "../icons/notebook.png";
import photo from "../icons/photo.png";
import procreate from "../icons/procreate.png";
import puppeteer from "../icons/puppeteer.png";
import react from "../icons/react.png";
import router from "../icons/router.png";
import sass from "../icons/sass.png";
import sketch from "../icons/sketch.png";
import storybook from "../icons/storybook.png";
import tailwind from "../icons/tailwind.png";
import tower from "../icons/tower.png";
import ts from "../icons/ts.png";
import vercel from "../icons/vercel.png";
import vite from "../icons/vite.png";
import vitest from "../icons/vitest.png";

export const COPY = {
  INTRO: translate("services-feature.website.full.intro"),
  BODY: translate("services-feature.website.full.body"),
  PROCESS: [
    {
      title: translate("services-feature.website.full.process.discovery.title"),
      body: translate("services-feature.website.full.process.discovery.body"),
    },
    {
      title: translate("services-feature.website.full.process.design.title"),
      body: translate("services-feature.website.full.process.design.body"),
    },
    {
      title: translate("services-feature.website.full.process.coding.title"),
      body: translate("services-feature.website.full.process.coding.body"),
    },
  ],
  DESIGN_CARD_TITLE: translate(
    "services-feature.website.full.card.design.title",
  ),
  DESIGN_CARD: translate("services-feature.website.full.card.design.body"),
  DESIGN_CARD_BTN: translate("services-feature.website.full.card.design.cta"),

  TECH_CARD_TITLE: translate("services-feature.website.full.card.tech.title"),
  TECH_CARD: translate("services-feature.website.full.card.tech.body"),
  TECH_CARD_BTN: translate("services-feature.website.full.card.tech.cta"),

  REPO_CARD_TITLE: translate("services-feature.website.full.card.repo.title"),
  REPO_CARD: translate("services-feature.website.full.card.repo.body"),
  BTN_SCHEDULE: translate("services-feature.website.full.btn.schedule"),
  BTN_CONTACT: translate("services-feature.website.full.btn.contact"),

  ICONS: [
    [astro, "Astro"],
    [css, "CSS 3"],
    [directus, "Directus CMS"],
    [docker, "Docker"],
    [github, "Github"],
    [html, "HTML 5"],
    [jest, "Jest"],
    [js, "JavaScript"],
    [next, "NextJS"],
    [puppeteer, "Puppeteer"],
    [react, "React"],
    [router, "React Router"],
    [sass, "Sass / SCSS"],
    [storybook, "Storybook"],
    [tailwind, "Tailwind"],
    [ts, "TypeScript"],
    [vite, "Vite"],
    [vitest, "Vitest"],
  ],

  DESIGN: [
    [photo, "Affinity Photo"],
    [figma, "Figma"],
    [notebook, "My trusty notepad"],
    [designer, "Affinity Designer"],
    [sketch, "Sketch"],
    [procreate, "Procreate"],

    [sketch, "Sketch"],
    [designer, "Affinity Designer"],
    [notebook, "My trusty notepad"],
    [procreate, "Procreate"],
    [figma, "Figma"],
    [photo, "Affinity Photo"],
  ],

  REPO: [
    [github, "Github"],
    [gitlab, "GitLab"],
    [cc, "Conventional Commits"],
    [git, "Git"],
    [bitbucket, "Bitbucket"],
    [netlify, "Netlify"],
    [tower, "Git Tower"],
    [vercel, "Vercel"],
  ],
};
