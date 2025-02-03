import { Fragment } from "react";
import { Outlet } from "react-router";
import { FooterSection, HeaderSection } from "@features";
import { MainWrapper } from "@ui/atoms";

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
