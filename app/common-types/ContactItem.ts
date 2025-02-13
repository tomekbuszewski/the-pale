import type { Href } from "@common-types/Href";

export interface ContactItem {
  body: string[];
  title: string;
  links: Href[];
}
