import { SectionWrapper, Text } from "@ui/atoms";
import { Box } from "@ui/molecules";

import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  email: string;
  calendar: string;
  location: string;
}

import { Sections } from "@nav";

import styles from "./ContactSection.module.scss";

function ContactSection({ email, calendar, location }: Props) {
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

  const COPY = [
    {
      TITLE: "Book a 30-min Call",
      BODY: [
        "Book a free 30-minute call for a no-obligation quote and consultation.",
        "Meeting takes place on Google Meet and is scheduled using Cal.com.",
      ],
      LINK: calendar,
      READ_MORE: "Book a call",
    },
    {
      TITLE: "Write me an email",
      BODY: [
        "Write me an email to kick things off!",
        "I’ll get back to you within 24 hours (Mon-Fri).",
      ],
      LINK: email,
      READ_MORE: "Shoot an email",
    },
  ];

  return (
    <SectionWrapper
      id={Sections.contact}
      title="Contact"
      contentClassName={styles.wrapper}
      className={styles.parent}
    >
      {COPY.map((item) => (
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
