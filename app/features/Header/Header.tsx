import * as nav from "@nav";
import { PageHeader as Main } from "@ui/organisms";
import { useTranslate } from "@hooks";

export default function Header() {
  const translate = useTranslate();
  return (
    <Main
      links={[...nav.HeaderNav, nav.Contact].map((item) => ({
        ...item,
        label: translate(item.label),
      }))}
    />
  );
}
