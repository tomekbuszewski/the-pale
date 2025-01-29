import { Link } from "react-router";
import { Logo, SectionWrapper, Text } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";
import clsx from "clsx";

import type { Href } from "@common-types/Href";
import type { HTMLProps, ReactNode } from "react";

import styles from "./PageFooter.module.scss";

interface HrefWithIcon extends Href {
  icon: ReactNode;
}

interface Props extends HTMLProps<HTMLDivElement> {
  copy: string;
  quickLinks: Href[];
  contact: HrefWithIcon[];
  contactDisclaimer: string;
  socials: HrefWithIcon[];
}

interface LinksProps extends HTMLProps<HTMLUListElement> {
  items: (Href | HrefWithIcon)[];
}

function isLinkHrefWithIcon(item: Href | HrefWithIcon): item is HrefWithIcon {
  return "icon" in item;
}

function Links({ items, className, ...rest }: LinksProps) {
  return (
    <ul className={clsx(className, styles.list)} {...rest}>
      {items.map((item) => {
        const withIcon = isLinkHrefWithIcon(item);

        return (
          <Text
            variant="list"
            key={item.href}
            className={clsx(styles.listItem, {
              [styles.noIcon]: !withIcon,
            })}
          >
            {withIcon ? item.icon : null}
            <Link to={item.href}>{item.text}</Link>
          </Text>
        );
      })}
    </ul>
  );
}

function PageFooter({
  copy,
  quickLinks,
  contact,
  contactDisclaimer,
  socials,
}: Props) {
  const year = new Date().getFullYear();

  return (
    <SectionWrapper
      tag="footer"
      id="contact"
      contentClassName={styles.wrapper}
      className={styles.parent}
    >
      <Logo wrapperClassName={styles.logo} />
      <Logo wrapperClassName={styles.logoBg} />

      <Text variant="regular" color="text" className={styles.navWrapper}>
        {copy}
      </Text>

      <nav className={styles.navWrapper}>
        <SectionHeader title="Quick links" />
        <Links items={quickLinks} />
      </nav>

      <nav className={styles.navWrapper}>
        <SectionHeader title="Contact" />
        <Links items={contact} />

        {contactDisclaimer && (
          <Text color="text" className={styles.disclaimer}>
            {contactDisclaimer}
          </Text>
        )}
      </nav>

      <nav className={styles.navWrapper}>
        <SectionHeader title="Socials" />
        <Links items={socials} />
      </nav>

      <section className={styles.copyright}>
        <Text color="text" align="right">
          © 2008 - {year}.<br />
          All rights reserved.
        </Text>

        <Text tag="p" variant="highlight" color="text" align="right">
          This site collects cookies for analytics and testing purposes.
        </Text>
      </section>
    </SectionWrapper>
  );
}

export default PageFooter;
