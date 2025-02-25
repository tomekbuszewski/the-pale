import { DEFAULT_TITLE, KEYWORDS, PAGE_URL, TWITTER } from "@contact";

import sharing from "./assets/sharing.jpg";
import { Content } from "@features";

const baseDescription = "head.feature.description";

const SEPARATOR = " · ";

const defaultMeta = [
  ["description", "Tomasz Buszewski"],
  ["keywords", KEYWORDS.join(", ")],
  ["og:description", baseDescription],
  ["og:title", baseDescription + SEPARATOR + DEFAULT_TITLE],
  ["og:type", "website"],
  ["og:url", PAGE_URL],
  ["og:image:width", "1920"],
  ["og:image:height", "1080"],
  ["og:image", PAGE_URL + sharing],
  ["og:site_name", baseDescription + SEPARATOR + DEFAULT_TITLE],
  ["twitter:card", PAGE_URL + sharing],
  ["twitter:site", TWITTER],
  ["twitter:creator", TWITTER],
  ["twitter:title", baseDescription + SEPARATOR + DEFAULT_TITLE],
  ["twitter:image", PAGE_URL + sharing],
  ["twitter:description", "Tomasz Buszewski"],
  ["twitter:image:alt", baseDescription + SEPARATOR + DEFAULT_TITLE],
  ["twitter:url", PAGE_URL],
  ["twitter:data2", new Date().toLocaleDateString("en-US")],
  ["article:published_time", new Date().toLocaleDateString("en-US")],
  ["article:modified_time", new Date().toLocaleDateString("en-US")],
  ["article:section", "Home"],
  ["article:author", "Tomasz Buszewski"],
  ["article:author:twitter", TWITTER],
  ["theme-color", "#ea516a"],
  ["apple-mobile-web-app-title", DEFAULT_TITLE],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
];

type MetaEntry = { name: string; content: string } | { title: string };

const metaArrayToNameContent = (
  meta: [string, string][],
  customImage?: string,
): MetaEntry[] => {
  const imageOverrides: Record<string, string> = customImage
    ? {
        "twitter:image": PAGE_URL + customImage,
        "og:image": PAGE_URL + customImage,
        "twitter:card": PAGE_URL + customImage,
      }
    : {};

  return Array.from(
    new Map<string, MetaEntry>(
      meta.map(([name, content]): [string, MetaEntry] => {
        const overriddenContent = imageOverrides[name] ?? content;

        if (name === "title") {
          return [name, { title: overriddenContent }];
        }
        return [name, { name, content: overriddenContent }];
      }),
    ).values(),
  );
};

export default function (
  title?: string,
  description?: string,
  customImage?: string,
) {
  const translate = Content.hooks.useTranslate();
  const titleTag = `${title ?? translate(baseDescription)} · ${DEFAULT_TITLE}`;
  const meta: [string, string][] = [
    ...defaultMeta,
    ["title", titleTag],
    ["description", description ?? translate(baseDescription)],
  ]
    .filter(([_, value]) => value !== null)
    .map(([name, content]) => {
      const body = content
        ?.split(SEPARATOR)
        .map((item) => translate(item))
        .join(SEPARATOR);
      return [name, body];
    }) as [string, string][];

  return metaArrayToNameContent(meta, customImage);
}
