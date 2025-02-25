import { Button, Text } from "@ui/atoms";
import clsx from "clsx";
import { motion } from "motion/react";

import type { ContactCTA as Props } from "@common-types/ContactCTA";

import styles from "./ContactCta.module.scss";

function ContactCta({ className, buttons, text, fixed, ...props }: Props) {
  return (
    <motion.aside
      className={clsx(styles.wrapper, className, {
        [styles.fixed]: fixed,
      })}
      {...props}
      initial={{ opacity: 0, y: fixed ? -24 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Text variant="large" dangerouslySetInnerHTML={{ __html: text }} />

      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Button
            key={button.label}
            to={button.onClick ? "" : button.href}
            variant={button.variant as "primary" | "secondary" | "tertiary"}
            onClick={(e) => {
              if (button.onClick) {
                e.preventDefault();
                button.onClick(e);
              }
            }}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </motion.aside>
  );
}

export default ContactCta;
