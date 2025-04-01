import type { HTMLProps } from "react";

export interface Props extends HTMLProps<HTMLDivElement> {
  project?: string;
  mode: "mobile" | "desktop" | "tablet";
  images: string[];
  title: string;
  description: string[];
  background: string;
}
