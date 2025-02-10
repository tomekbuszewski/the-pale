import type { HTMLMotionProps } from "motion/react";
import type { HTMLProps, ReactNode } from "react";

export interface LargeCard extends HTMLMotionProps<"section"> {
  title: string;
  align?: "left" | "right";
  description: ReactNode;
  more?: {
    href: string;
    label: string;
  };
  body: ReactNode;
}
