import { type HTMLProps, useEffect, useRef, useState } from "react";
import { Sections } from "@nav";
import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";

import type { ContactItem } from "@common-types/ContactItem";

import styles from "./ContactSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  location: string;
  copy: ContactItem[];
}

function getCurrentTime() {
  return [
    new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/Warsaw",
      hour: "numeric",
      minute: "numeric",
    }),
    new Date().toLocaleDateString("en-GB", {
      timeZone: "Europe/Warsaw",
      weekday: "short",
      month: "short",
      day: "numeric",
    }),
  ];
}

function ContactSection({ location, copy }: Props) {
  const [time, setTime] = useState<string[]>();
  const intervalId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setTime(getCurrentTime());

    intervalId.current = setInterval(() => {
      setTime(getCurrentTime());
    }, 1000);

    return () => {
      if (intervalId?.current) {
        clearInterval(intervalId.current);
      }
    };
  }, [setTime]);

  return (
    <SectionWrapper
      id={Sections.contact}
      title="Contact"
      contentClassName={styles.wrapper}
      columns={{ sm: 1, md: 3, lg: 3 }}
      className={styles.parent}
      itemScope
      itemType="https://schema.org/ContactPoint"
    >
      <meta itemProp="contactType" content="customer service" />
      <meta
        itemProp="email"
        content={copy[1].links[0].href.replace("mailto:", "")}
      />
      <meta
        itemProp="telephone"
        content={copy[1].links[1].href.replace("tel:", "")}
      />
      <meta itemProp="areaServed" content={location} />

      {copy.map((item) => (
        <Box link={item.links} title={item.title} key={item.title}>
          {item.body.map((text, i) => (
            <Text key={i}>{text}</Text>
          ))}
        </Box>
      ))}

      <Box>
        <Text className="sr-only">Designed and developed in</Text>

        <Text className={styles.developed}>
          {location}
          <br />
          {time?.join(", ")}
        </Text>
      </Box>
    </SectionWrapper>
  );
}

export default ContactSection;
