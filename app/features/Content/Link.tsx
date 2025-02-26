import {
  Link as BaseLink,
  type LinkProps,
  NavLink as BaseNavLink,
  type NavLinkProps,
  type To,
} from "react-router";
import { Content } from "@features";
import { useContext } from "react";

function checkForPrefix(path?: string) {
  const prefixes = ["http", "mailto", "tel"];
  return prefixes.some((prefix) => path?.startsWith(prefix));
}

function handleLink(link: To, language: string = "en") {
  const lang = language === "en" ? "" : `/${language}`;
  const isString = typeof link === "string";

  if (isString) {
    if (checkForPrefix(link)) {
      return link;
    }

    return `${lang}${link}`;
  }

  if (checkForPrefix(link.pathname)) {
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
