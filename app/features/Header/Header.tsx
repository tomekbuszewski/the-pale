import * as nav from "@nav";
import { PageHeader as Main } from "@ui/organisms";

export default function Header() {
  return <Main links={[...nav.HeaderNav, nav.Contact]} />;
}
