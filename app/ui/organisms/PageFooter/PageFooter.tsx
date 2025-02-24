import { Sections } from "@nav";
import { Logo, SectionWrapper, Text } from "@ui/atoms";
import { SectionHeader, Switch } from "@ui/molecules";
import { Content } from "@features";
import clsx from "clsx";

import type { Href } from "@common-types/Href";
import { type HTMLProps, type ReactNode, useContext } from "react";

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
  onLanguageChange?: (lang: string) => void;
  languages?: Href[];
}

interface LinksProps extends HTMLProps<HTMLUListElement> {
  items: (Href | HrefWithIcon)[];
}

function isLinkHrefWithIcon(item: Href | HrefWithIcon): item is HrefWithIcon {
  return "icon" in item;
}

function Links({ items, className, ...rest }: LinksProps) {
  const { Link } = Content.components;

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
            <Link {...linkProps}>{item.label}</Link>
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
  languages,
  onLanguageChange,
}: Props) {
  const translate = Content.hooks.useTranslate();
  const language = useContext(Content.context);

  return (
    <SectionWrapper
      tag="footer"
      id={Sections.footer}
      contentClassName={styles.wrapper}
      columns={{ sm: 12, md: 4, lg: 4 }}
      className={styles.parent}
      itemScope
      itemType="https://schema.org/Organization"
    >
      <meta itemProp="name" content={copy.split(" ")[0]} />
      <meta itemProp="contactPoint" content="#contact" />

      <Logo wrapperClassName={styles.logo} />
      <Logo wrapperClassName={styles.logoBg} />

      <aside className={styles.navWrapper}>
        <Text variant="regular">{copy}</Text>
        {onLanguageChange && languages ? (
          <Switch
            defaultActiveIndex={languages.findIndex(
              (lang) => lang.href === language,
            )}
            items={languages}
            onChange={onLanguageChange}
            className={styles.switch}
          />
        ) : null}
      </aside>

      <nav className={styles.navWrapper}>
        <SectionHeader
          title={translate("footer.section.boxes.quick-links")}
          margin="none"
        />
        <Links items={quickLinks} />
      </nav>

      <nav className={styles.navWrapper}>
        <SectionHeader
          title={translate("footer.section.boxes.contact")}
          margin="none"
        />
        <Links items={contact} />

        {contactDisclaimer && (
          <Text className={styles.disclaimer}>{contactDisclaimer}</Text>
        )}
      </nav>

      <nav className={styles.navWrapper}>
        <SectionHeader
          title={translate("footer.section.boxes.socials")}
          margin="none"
        />
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
