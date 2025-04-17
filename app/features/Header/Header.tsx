import { Content } from "@features";
import * as nav from "@nav";

import { PageHeader as Main } from "@ui/organisms";

export default function Header() {
  const translate = Content.hooks.useTranslate();
  return (
    <Main
      links={[...nav.HeaderNav, nav.Contact]
        .map((item) => ({
          ...item,
          label: translate(item.label),
        }))
        .filter(({ label }) => label !== "")}
    />
  );
}
