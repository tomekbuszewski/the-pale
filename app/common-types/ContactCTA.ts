import type { Href } from "@common-types/Href";
import type { HTMLMotionProps } from "motion/react";

export interface ContactCTA extends HTMLMotionProps<"footer"> {
  text: string;
  buttons: Href[];
  fixed?: boolean;
}
