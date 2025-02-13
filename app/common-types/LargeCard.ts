import type { Href } from "@common-types/Href";
import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export interface LargeCard extends HTMLMotionProps<"section"> {
  title: string;
  align?: "left" | "right";
  description: ReactNode | string[];
  more?: Href;
  body: ReactNode;
}
