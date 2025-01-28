import { PageHeader as Main } from "@ui/organisms";

export default function Header() {
  return (
    <Main
      links={[
        { title: "Home", href: "/" },
        { title: "About", href: "/about" },
        { title: "Contact", href: "/contact" },
      ]}
    />
  );
}
