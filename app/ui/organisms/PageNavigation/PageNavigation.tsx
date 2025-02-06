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
}

function PageNavigation({ className, visible, links, ...rest }: Props) {
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
        {links.map((link, i) => (
          <li
            key={link.href}
            className={clsx({
              [styles.contact]: i === links.length - 1,
            })}
          >
            <NavLink to={link.href} className={clsx(styles.link)}>
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default PageNavigation;
