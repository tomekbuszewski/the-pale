import clsx from "clsx";

import type { Href } from "@common-types/Href";
import type { HTMLProps } from "react";

import styles from "./PageNavigation.module.scss";
import { Content } from "@features";

interface Props extends HTMLProps<HTMLDivElement> {
  links: Href[];
  visible?: boolean;
  onLinkClick?: () => void;
}

function PageNavigation({
  className,
  visible,
  links,
  onLinkClick,
  ...rest
}: Props) {
  const { NavLink } = Content.components;
  const classNames = [className, styles.navigation];

  return (
    <nav
      {...rest}
      role="navigation"
      className={clsx(classNames, {
        [styles.hidden]: !visible,
      })}
    >
      <ul className={styles.linkWrapper}>
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={clsx(styles.link)}
              onClick={onLinkClick}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PageNavigation;
