import type { Href } from "@common-types/Href";

export type ContactItem = Href & {
  body: string[];
};
