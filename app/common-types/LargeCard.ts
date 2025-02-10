import type { HTMLMotionProps } from "motion/react";
import type { ReactNode } from "react";

export interface LargeCard extends HTMLMotionProps<"section"> {
  title: string;
  align?: "left" | "right";
  description: ReactNode | string[];
  more?: {
    href: string;
    label: string;
  };
  body: ReactNode;
}
