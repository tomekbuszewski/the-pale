import type { HTMLMotionProps } from "motion/react";

export interface ContactCTA extends HTMLMotionProps<"footer"> {
  text: string;
  buttons: {
    label: string;
    href: string;
    variant: string;
  }[];
}
