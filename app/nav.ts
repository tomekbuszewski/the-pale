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
  { text: "Works", href: "/#" + Sections.works },
  { text: "Services", href: "/#" + Sections.services },
  { text: "Videos", href: "/#" + Sections.videos },
  { text: "About", href: "/#" + Sections.about },
];

export const Contact = { text: "Contact", href: "#" + Sections.contact };

export const Pages = [
  { text: "Home", href: "/" },
  { text: "Technology I use", href: "/tech" },
  { text: "Hardware & Software", href: "/uses" },
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
