import { Fragment, type HTMLProps } from "react";
import { Outlet } from "react-router";
import { Contact, FooterSection, Head, HeaderSection } from "@features";
import { MainWrapper } from "@ui/atoms";

import "../ui/styles/utils.scss";

export function meta() {
  return Head.component();
}

export function BaseLayout({ children }: HTMLProps<HTMLDivElement>) {
  return (
    <Fragment>
      <HeaderSection.component />
      <MainWrapper>
        {children}
        <Contact.component />
      </MainWrapper>
      <FooterSection.component />
    </Fragment>
  );
}

export default function LayoutMain() {
  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
}
