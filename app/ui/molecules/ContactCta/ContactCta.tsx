import { Button, Text } from "@ui/atoms";
import clsx from "clsx";
import { type HTMLMotionProps, motion } from "motion/react";

import styles from "./ContactCta.module.scss";

interface Props extends HTMLMotionProps<"footer"> {
  buttons: {
    label: string;
    href: string;
    variant: string;
  }[];
}

function ContactCta({ className, buttons, ...props }: Props) {
  return (
    <motion.footer
      className={clsx(styles.wrapper, className)}
      {...props}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <Text variant="large">Ready to create your website?</Text>

      <div className={styles.buttons}>
        {buttons.map((button) => (
          <Button
            key={button.label}
            to={button.href}
            variant={button.variant as "primary" | "secondary" | "tertiary"}
          >
            {button.label}
          </Button>
        ))}
      </div>
    </motion.footer>
  );
}

export default ContactCta;
