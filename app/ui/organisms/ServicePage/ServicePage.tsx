import { type HTMLProps, type ReactNode, useState } from "react";
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
import { translate } from "@utils/translate";
import clsx from "clsx";

import type { ContactCTA } from "@common-types/ContactCTA";
import type { LargeCard as Card } from "@common-types/LargeCard";

import styles from "./ServicePage.module.scss";

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
  body: string;
  process?: string;
  processItems?: Process[];
  cards?: CardWithIcons[];
  cta?: ContactCTA;
}

const defaultCTA = {
  text: translate("services-feature.website.full.cta") as string,
  buttons: [
    {
      variant: "primary",
      label: translate("services-feature.website.full.btn.schedule") as string,
      href: CAL,
    },
    {
      variant: "secondary",
      label: translate("services-feature.website.full.btn.contact") as string,
      href: "#contact",
    },
  ],
};

function ServicePage({
  title,
  intro,
  body,
  process,
  processItems,
  cards,
  cta = defaultCTA,
}: Props) {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title={title} />
      <section className={styles.mainSection}>
        <Text
          variant="article-body"
          dangerouslySetInnerHTML={{ __html: intro }}
        />
        <Separator />
        <Text
          variant="article-body"
          dangerouslySetInnerHTML={{ __html: body }}
        />
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
      ) : null}

      <section className={clsx(styles.full, styles.mainSection)}>
        <ContactCta {...cta} />
      </section>
    </SectionWrapper>
  );
}

export default ServicePage;
