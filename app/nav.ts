import { translate } from "./utils/translate";

export const Sections = {
  hero: "hero",
  about: "about",
  services: "services",
  clients: "clients",
  works: "works",
  contact: "contact",
  videos: "videos",
  footer: "footer",
};

export const HeaderNav = [
  { text: translate("nav.works"), href: "/#" + Sections.works },
  { text: translate("nav.services"), href: "/#" + Sections.services },
  { text: translate("nav.videos"), href: "/#" + Sections.videos },
  { text: translate("nav.about"), href: "/#" + Sections.about },
];

export const Contact = {
  text: translate("nav.contact"),
  href: "#" + Sections.contact,
};

export const Pages = [
  { text: translate("nav.home"), href: "/" },
  { text: translate("nav.tech"), href: "/tech" },
  { text: translate("nav.uses"), href: "/uses" },
];

const BASE_SERVICES = "/services";

export const StaticRoutes = {
  // services: BASE_SERVICES,
  website: BASE_SERVICES + "/website",
  frontend: BASE_SERVICES + "/frontend",
  consulting: BASE_SERVICES + "/consulting",
  uses: "/uses",
  tech: "/tech",
};

export const Routes = {
  ...StaticRoutes,
  writings: "/writings",
  post: "/writings/:slug",
  pagination: "/writings/page/:page",
};
