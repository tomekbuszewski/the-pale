import { Sections } from "@nav";
import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";

import type { ContactItem } from "@common-types/ContactItem";
import type { HTMLProps } from "react";

import styles from "./ContactSection.module.scss";

interface Props extends HTMLProps<HTMLDivElement> {
  location: string;
  copy: ContactItem[];
}

function ContactSection({ location, copy }: Props) {
  const localTime = new Date().toLocaleTimeString("en-GB", {
    timeZone: "Europe/Warsaw",
    hour: "numeric",
    minute: "numeric",
  });

  const localDate = new Date().toLocaleDateString("en-GB", {
    timeZone: "Europe/Warsaw",
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <SectionWrapper
      id={Sections.contact}
      title="Contact"
      contentClassName={styles.wrapper}
      columns={{ sm: 1, md: 3, lg: 3 }}
      className={styles.parent}
    >
      {copy.map((item) => (
        <Box
          link={item.LINK}
          title={item.TITLE}
          key={item.TITLE}
          readMoreLabel={item.READ_MORE}
        >
          {item.BODY.map((text, i) => (
            <Text key={i}>{text}</Text>
          ))}
        </Box>
      ))}

      <Box>
        <Text className="sr-only">Designed and developed in</Text>

        <Text className={styles.developed}>
          {location}
          <br />
          {localTime}, {localDate}
        </Text>
      </Box>
    </SectionWrapper>
  );
}

export default ContactSection;
