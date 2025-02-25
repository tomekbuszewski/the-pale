import {
  Link as BaseLink,
  type LinkProps,
  NavLink as BaseNavLink,
  type NavLinkProps,
  type To,
} from "react-router";
import { Content } from "@features";
import { useContext } from "react";

function handleLink(link: To, language: string = "en") {
  const lang = language === "en" ? "" : `/${language}`;
  const isString = typeof link === "string";

  if (isString) {
    if (link.startsWith("http")) {
      return link;
    }

    return `${lang}${link}`;
  }

  if (link?.pathname?.startsWith("http")) {
    return link;
  }

  return {
    ...link,
    pathname: `${lang}${link?.pathname}`,
  };
}

export function Link(props: LinkProps) {
  const language = useContext(Content.context);
  return <BaseLink {...props} to={handleLink(props.to, language)} />;
}

export function NavLink(props: NavLinkProps) {
  const language = useContext(Content.context);
  return <BaseNavLink {...props} to={handleLink(props.to, language)} />;
}
