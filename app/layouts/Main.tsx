import { Fragment, type HTMLProps } from "react";
import { Outlet } from "react-router";
import { Contact, FooterSection, Head, HeaderSection } from "@features";
import { MainWrapper } from "@ui/atoms";

export function meta() {
  return Head.component();
}

export function BaseLayout({ children }: HTMLProps<HTMLDivElement>) {
  return (
    <Fragment>
      <HeaderSection.component />
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
