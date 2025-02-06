import { Fragment } from "react";
import { Outlet } from "react-router";
import { FooterSection, Head, HeaderSection } from "@features";
import { MainWrapper } from "@ui/atoms";

export function meta() {
  return Head.component();
}

export default function LayoutMain() {
  return (
    <Fragment>
      <HeaderSection.component />
      <MainWrapper>
        <Outlet />
      </MainWrapper>

      <FooterSection.component />
    </Fragment>
  );
}
