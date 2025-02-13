import type { Href } from "@common-types/Href";
import type { Meta } from "@common-types/Meta";
import type { ReactNode } from "react";

export interface BlogPost extends Meta {
  title: string;
  shortTitle?: string;
  youtube: string;
  link: Href | Href[];
  icon?: never;
  onClick?: never;
  children?: ReactNode;
  active?: never;
  cnt?: string;
}
