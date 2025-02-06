export const HeaderNav = [
  { text: "Works", href: "/#works" },
  { text: "Services", href: "/#services" },
  { text: "Videos", href: "/#videos" },
  { text: "About", href: "/#about" },
];

export const Contact = { text: "Contact", href: "#contact" };

export const Pages = [
  { text: "Home", href: "/" },
  { text: "Technology I use", href: "/tech" },
  { text: "Hardware & Software", href: "/uses" },
];

const BASE_SERVICES = "/services";

export const Routes = {
  services: BASE_SERVICES,
  website: BASE_SERVICES + "/website",
  frontend: BASE_SERVICES + "/frontend",
  consulting: BASE_SERVICES + "/consulting",

  uses: "/uses",
  tech: "/tech",
  writings: "/writings",
  post: "/writings/:slug",
  pagination: "/writings/page/:page",
};
