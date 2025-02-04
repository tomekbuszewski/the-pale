import type { ReactNode } from "react";

export interface Service {
  icon: ReactNode;
  title: string;
  onClick: () => void;
  hidden?: boolean;
  date?: never;
  tags?: never;
  youtube?: never;
  link: string;
  active?: boolean;
  children: ReactNode;
}
