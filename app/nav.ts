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
  { label: "nav.works", href: "/#" + Sections.works },
  { label: "nav.services", href: "/#" + Sections.services },
  { label: "nav.videos", href: "/#" + Sections.videos },
  { label: "nav.about", href: "/#" + Sections.about },
];

export const Contact = {
  label: "nav.contact",
  href: "#" + Sections.contact,
};

export const Pages = [
  { label: "nav.home", href: "/" },
  { label: "nav.tech", href: "/tech" },
  { label: "nav.uses", href: "/uses" },
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
  works: "/works/:slug",
};
