import type { ReactNode } from "react";

export interface BlogPost {
  title: string;
  date: Date;
  tags: string[];
  youtube: string;
  link: string;
  icon?: never;
  onClick?: never;
  children: ReactNode;
}
