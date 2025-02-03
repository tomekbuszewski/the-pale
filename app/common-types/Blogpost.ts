import type { Meta } from "@common-types/Meta";
import type { ReactNode } from "react";

export interface BlogPost extends Meta {
  title: string;
  youtube: string;
  link: string;
  icon?: never;
  onClick?: never;
  children?: ReactNode;
  active?: never;
  cnt?: string;
}
