import { Link } from "react-router";
import { Sections } from "@nav";
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
  copyright: string;
  cookies: string;
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
        const linkProps = {
          to: item.href,
          target: item.external ? "_blank" : undefined,
          rel: item.external ? "noopener noreferrer" : undefined,
        };

        return (
          <Text
            variant="list"
            key={item.href}
            className={clsx(styles.listItem, {
              [styles.noIcon]: !withIcon,
            })}
          >
            {withIcon ? item.icon : null}
            <Link {...linkProps}>{item.text}</Link>
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
  copyright,
  cookies,
}: Props) {
  return (
    <SectionWrapper
      tag="footer"
      id={Sections.footer}
      contentClassName={styles.wrapper}
      columns={{ sm: 12, md: 4, lg: 4 }}
      className={styles.parent}
    >
      <Logo wrapperClassName={styles.logo} />
      <Logo wrapperClassName={styles.logoBg} />

      <Text variant="regular" className={styles.navWrapper}>
        {copy}
      </Text>

      <nav className={styles.navWrapper}>
        <SectionHeader title="Quick links" margin="none" />
        <Links items={quickLinks} />
      </nav>

      <nav className={styles.navWrapper}>
        <SectionHeader title="Contact" margin="none" />
        <Links items={contact} />

        {contactDisclaimer && (
          <Text className={styles.disclaimer}>{contactDisclaimer}</Text>
        )}
      </nav>

      <nav className={styles.navWrapper}>
        <SectionHeader title="Socials" margin="none" />
        <Links items={socials} />
      </nav>

      <section className={styles.copyright}>
        <Text align="right" dangerouslySetInnerHTML={{ __html: copyright }} />

        <Text
          tag="p"
          variant="highlight"
          dangerouslySetInnerHTML={{ __html: cookies }}
        />
      </section>
    </SectionWrapper>
  );
}

export default PageFooter;
