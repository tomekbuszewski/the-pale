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
import clsx from "clsx";

import { COPY } from "./copy";

import styles from "./index.module.scss";

export default function WebDevelopment() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Web&nbsp;Design &&nbsp;Development" />

      <section className={styles.mainSection}>
        <Text variant="article-body">{COPY.INTRO}</Text>

        <Separator />

        <Text variant="article-body">{COPY.BODY}</Text>
      </section>

      <section
        className={clsx(styles.mainSection, styles.process, styles.full)}
      >
        <SectionHeader title="The process" margin="small" />

        {COPY.PROCESS.map((item, index) => (
          <div key={item.title}>
            <SmallCard no={index + 1} {...item} />
          </div>
        ))}
      </section>

      <section className={clsx(styles.full, styles.mainSection)}>
        <LargeCard
          title={COPY.DESIGN_CARD_TITLE}
          more={{
            label: COPY.DESIGN_CARD_BTN,
            href: "/#works",
          }}
          description={COPY.DESIGN_CARD.map((item) => (
            <Text variant="large" key={item}>
              {item}
            </Text>
          ))}
          body={
            <Carousel
              large
              width="16rem"
              icon="16rem"
              columns={2}
              icons={COPY.DESIGN as [string, string][]}
            />
          }
        />

        <LargeCard
          align="right"
          title={COPY.TECH_CARD_TITLE}
          more={{
            label: COPY.TECH_CARD_BTN,
            href: "/tech",
          }}
          description={COPY.TECH_CARD.map((item) => (
            <Text variant="large" key={item}>
              {item}
            </Text>
          ))}
          body={
            <Carousel
              width="12rem"
              icon="6rem"
              columns={2}
              icons={COPY.ICONS as [string, string][]}
            />
          }
        />

        <LargeCard
          title={COPY.REPO_CARD_TITLE}
          description={COPY.REPO_CARD.map((item) => (
            <Text variant="large" key={item}>
              {item}
            </Text>
          ))}
          body={""}
        />
      </section>

      <section className={clsx(styles.full, styles.mainSection)}>
        <ContactCta
          buttons={[
            { variant: "primary", label: COPY.BTN_SCHEDULE, href: CAL },
            { variant: "secondary", label: COPY.BTN_CONTACT, href: "#contact" },
          ]}
        />
      </section>
    </SectionWrapper>
  );
}
