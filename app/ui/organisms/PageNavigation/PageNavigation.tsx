import { NavLink } from "react-router";
import clsx from "clsx";

import type { HTMLProps } from "react";

import styles from "./PageNavigation.module.scss";

interface Link {
  text: string;
  href: string;
}

interface Props extends HTMLProps<HTMLDivElement> {
  links: Link[];
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
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PageNavigation;
