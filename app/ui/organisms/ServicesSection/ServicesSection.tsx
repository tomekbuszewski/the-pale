import { type CSSProperties, type HTMLProps, useRef, useState } from "react";
import { useIsMobile } from "@hooks";
import { Sections } from "@nav";
import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";
import clsx from "clsx";

import type { Href } from "@common-types/Href";
import type { Service } from "@common-types/Service";

import Check from "./assets/check.svg?react";

import styles from "./ServicesSection.module.scss";
import { Content } from "@features";

interface ExpandedService extends Service {
  additional: string[];
  link: Href[];
}

interface Props extends HTMLProps<HTMLDivElement> {
  items: ExpandedService[];
  title: string;
}

interface AdditionalProps extends HTMLProps<HTMLDivElement> {
  items: string[];
  isActive?: boolean;
}

function Additional({ items, isActive, ...rest }: AdditionalProps) {
  const left = items.slice(0, 3);
  const right = items.slice(3);

  return (
    <div className={styles.additionalWrapper} {...rest}>
      {[left, right].map((item) => (
        <ul
          className={styles.additional}
          data-active={isActive ? "true" : "false"}
          key={item.join("-")}
        >
          {item.map((text) => (
            <Text variant="list" key={text} className={styles.additionalItem}>
              <i>
                <Check />
              </i>
              {text}
            </Text>
          ))}
        </ul>
      ))}
    </div>
  );
}

function ServicesSection({ items, title }: Props) {
  const isMobile = useIsMobile();
  const [active, setActive] = useState<number | undefined>(undefined);
  const activeKey = "--active" as keyof CSSProperties;
  const isSectionActive = typeof active === "number";
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const translate = Content.hooks.useTranslate();

  return (
    <SectionWrapper
      className={styles.container}
      title={title}
      id={Sections.services}
    >
      <div
        style={isSectionActive ? { [activeKey]: String(active) } : {}}
        className={clsx(styles.wrapper, {
          [styles.active]: isSectionActive,
        })}
        itemScope
        itemType="https://schema.org/OfferCatalog"
        itemProp="hasOfferCatalog"
      >
        {items.map(({ link, ...item }, i) => {
          const shouldHide = typeof active !== "undefined" && i !== active;
          const isActive = i === active;

          function handleClick(item: number | undefined) {
            const setter = isSectionActive ? undefined : item;

            setActive(setter);

            if (!isMobile || typeof setter === "undefined") {
              return;
            }

            setTimeout(() => {
              itemRefs.current[i]?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 500);
          }

          const readMoreLabel = translate(
            isActive
              ? "services.section.read-more-close"
              : "services.section.read-more-open",
          );

          return (
            <div
              ref={(el) => {
                if (el) {
                  itemRefs.current[i] = el;
                }
              }}
              className={styles.item}
              key={item.title}
              data-active={isActive ? "true" : "false"}
            >
              <Box
                {...item}
                itemScope
                itemType="https://schema.org/Service"
                itemProp="itemOffered"
                link={[
                  ...link,
                  {
                    label: readMoreLabel,
                    href: "",
                    variant: "tertiary",
                    onClick: (e) => {
                      e.preventDefault();

                      if (isSectionActive) {
                        setActive(undefined);
                      } else {
                        handleClick(i);
                      }
                    },
                  },
                ]}
                active={isActive}
                hidden={shouldHide}
              >
                {item.children}
                <meta itemProp="name" content={item.title} />
                <meta itemProp="url" content={link[0].href} />
                <meta itemProp="position" content={String(i + 1)} />
              </Box>

              <Additional
                items={item.additional}
                isActive={isActive}
                onClick={() => handleClick(undefined)}
              />
            </div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}

export default ServicesSection;
