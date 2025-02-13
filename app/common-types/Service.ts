import type { Href } from "@common-types/Href";
import type { ReactNode } from "react";

export interface Service {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  hidden?: boolean;
  date?: never;
  tags?: never;
  youtube?: never;
  link: Href | Href[];
  active?: boolean;
  children: ReactNode;
}
