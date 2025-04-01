import type { ReactNode } from "react";
import type { Href } from "@common-types/Href";
import type { HTMLMotionProps } from "motion/react";

export interface LargeCard extends HTMLMotionProps<"section"> {
  title: string;
  align?: "left" | "right";
  description: ReactNode | string[];
  more?: Href;
  body: ReactNode;
  contentCentered?: boolean;
}
