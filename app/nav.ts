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
  { text: translate("nav.works") as string, href: "/#" + Sections.works },
  { text: translate("nav.services") as string, href: "/#" + Sections.services },
  { text: translate("nav.videos") as string, href: "/#" + Sections.videos },
  { text: translate("nav.about") as string, href: "/#" + Sections.about },
];

export const Contact = {
  text: translate("nav.contact") as string,
  href: "#" + Sections.contact,
};

export const Pages = [
  { text: translate("nav.home") as string, href: "/" },
  { text: translate("nav.tech") as string, href: "/tech" },
  { text: translate("nav.uses") as string, href: "/uses" },
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
