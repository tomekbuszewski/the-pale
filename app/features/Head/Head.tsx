import { DEFAULT_TITLE, KEYWORDS, PAGE_URL } from "@contact";

import sharing from "./assets/sharing.jpg";

const baseDescription = "Expertly-crafted websites for your business";

const defaultMeta: [string, string][] = [
  ["description", "Tomasz Buszewski"],
  ["keywords", KEYWORDS.join(", ")],
  ["og:description", baseDescription],
  ["og:title", DEFAULT_TITLE],
  ["og:type", "website"],
  ["og:url", PAGE_URL],
  ["og:image:width", "1920"],
  ["og:image:height", "1080"],
  ["og:image", PAGE_URL + sharing],
  ["og:site_name", DEFAULT_TITLE],
  ["twitter:card", PAGE_URL + sharing],
  ["twitter:site", "@tomekbuszewski"],
  ["twitter:creator", "@tomekbuszewski"],
  ["twitter:title", DEFAULT_TITLE],
  ["twitter:image", PAGE_URL + sharing],
  ["twitter:description", "Tomasz Buszewski"],
  ["twitter:image:alt", DEFAULT_TITLE],
  ["twitter:url", PAGE_URL],
  ["twitter:data2", new Date().toLocaleDateString("en-US")],
  ["article:published_time", new Date().toLocaleDateString("en-US")],
  ["article:modified_time", new Date().toLocaleDateString("en-US")],
  ["article:section", "Home"],
  ["article:author", "Tomasz Buszewski"],
  ["article:author:twitter", "@tomekbuszewski"],
  ["theme-color", "#ea516a"],
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
  const titleTag = `${title ?? baseDescription} · ${DEFAULT_TITLE}`;
  const meta: [string, string][] = [
    ...defaultMeta,
    ["title", titleTag],
    ["description", description ?? baseDescription],
  ];

  return metaArrayToNameContent(meta, customImage);
}
