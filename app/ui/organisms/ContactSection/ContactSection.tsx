import { SectionWrapper, Text } from "@ui/atoms";

import type { HTMLProps } from "react";

interface Props extends HTMLProps<HTMLDivElement> {
  email: string;
  calendar: string;
  location: string;
}

import clsx from "clsx";

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

  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      contentClassName={styles.wrapper}
      className={styles.parent}
    >
      <div
        onClick={() => window.open(calendar, "_blank")}
        className={styles.item}
      >
        <Text variant="title" className="mb-lg" color="lead">
          Book a 30-min Call
        </Text>
        <Text className="mb-lg" color="text">
          Book a free 30-minute call for a no-obligation quote and consultation.
        </Text>
        <Text variant="highlight" color="text">
          Meeting takes place on Google Meet and is scheduled using Cal.com.
        </Text>
      </div>

      <div onClick={() => window.open(email)} className={styles.item}>
        <Text variant="title" className="mb-lg" color="lead">
          Write me an email
        </Text>
        <Text className="mb-lg" color="text">
          Write me an email to kick things off!
        </Text>
        <Text variant="highlight" color="text">
          I’ll get back to you within 24 hours (Mon-Fri).
        </Text>
      </div>

      <div>
        <Text
          variant="title"
          className={clsx(styles.hiddenTitle, "mb-lg")}
          color="lead"
        >
          Designed and developed in
        </Text>
        <Text color="text">
          {location}
          <br />
          {localTime}, {localDate}
        </Text>
      </div>
    </SectionWrapper>
  );
}

export default ContactSection;
