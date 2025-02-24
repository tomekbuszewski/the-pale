import * as nav from "@nav";
import { PageHeader as Main } from "@ui/organisms";
import { Content } from "@features";

export default function Header() {
  const translate = Content.hooks.useTranslate();
  return (
    <Main
      links={[...nav.HeaderNav, nav.Contact].map((item) => ({
        ...item,
        label: translate(item.label),
      }))}
    />
  );
}
