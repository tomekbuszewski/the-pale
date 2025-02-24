import { Fragment, type HTMLProps, type ReactNode, useState } from "react";
import { CAL } from "@contact";
import { SectionWrapper, Separator, Text } from "@ui/atoms";
import {
  ArticleHeader,
  Carousel,
  ContactCta,
  LargeCard,
  SectionHeader,
  SmallCard,
} from "@ui/molecules";
import { createMotionConfig } from "@utils/fadeIn";
import clsx from "clsx";

import type { ContactCTA } from "@common-types/ContactCTA";
import type { Href } from "@common-types/Href";
import type { LargeCard as Card } from "@common-types/LargeCard";

import styles from "./ServicePage.module.scss";
import { useTranslate } from "@hooks";

interface Process {
  title: string;
  body: string;
}

interface CardWithIcons extends Omit<Card, "body"> {
  icons: string[][] | ReactNode;
}

interface Props extends HTMLProps<HTMLDivElement> {
  title: string;
  intro: string;
  body: string | string[];
  process?: string;
  processItems?: Process[];
  cards?: CardWithIcons[];
  cta?: ContactCTA;
  whatYouGet?: string;
}

function ServicePage({
  title,
  intro,
  body,
  process,
  processItems,
  cards,
  whatYouGet,
  cta,
}: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const translate = useTranslate();

  const defaultCTA = {
    text: translate("services.feature.website.full.cta"),
    buttons: [
      {
        variant: "primary",
        label: translate("services.feature.website.full.btn.schedule"),
        href: CAL,
      },
      {
        variant: "secondary",
        label: translate("services.feature.website.full.btn.contact"),
        href: "#contact",
      },
    ] as Href[],
  };

  const ctaContent = cta ?? defaultCTA;

  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title={title} />
      <section className={styles.mainSection}>
        <Text
          variant="article-body"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <Separator />

        {Array.isArray(body) ? (
          body.map((item, index) => (
            <Text
              key={index}
              variant="article-body"
              dangerouslySetInnerHTML={{ __html: item }}
            />
          ))
        ) : (
          <Text
            variant="article-body"
            dangerouslySetInnerHTML={{ __html: body }}
          />
        )}
      </section>
      {processItems && process ? (
        <section
          className={clsx(styles.mainSection, styles.process, styles.full)}
        >
          <SectionHeader title={process} />
          {processItems.map((item, index) => (
            <div key={item.title}>
              <SmallCard
                no={index + 1}
                {...item}
                {...createMotionConfig(index)}
              />
            </div>
          ))}
        </section>
      ) : null}
      {cards ? (
        <Fragment>
          {whatYouGet ? (
            <SectionHeader
              className={styles.whatYouGet}
              noRow
              title={whatYouGet}
            />
          ) : null}
          <section className={clsx(styles.full, styles.mainSection)}>
            {cards.map((card, index) => (
              <LargeCard
                {...createMotionConfig(index)}
                align={index % 2 === 0 ? "left" : "right"}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                title={card.title}
                more={card.more}
                key={card.title}
                description={card.description}
                body={
                  Array.isArray(card.icons) ? (
                    <Carousel
                      active={activeCard === index}
                      columns={2}
                      width="12rem"
                      icon="6rem"
                      icons={card.icons}
                    />
                  ) : (
                    card.icons
                  )
                }
              />
            ))}
          </section>
        </Fragment>
      ) : null}
      <section className={clsx(styles.full, styles.mainSection)}>
        <ContactCta {...ctaContent} />
      </section>
    </SectionWrapper>
  );
}

export default ServicePage;
