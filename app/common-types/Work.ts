type Tag =
  | "work.item.tag.design"
  | "work.item.tag.development"
  | "work.item.tag.consultation"
  | "work.item.tag.maintenance";

export interface Work {
  description: string | string[];
  mobileImage: string | OutputMetadata;
  desktopImage: string | OutputMetadata;
  background?: string;
  link?: string;
  study?: string;
  tags: Tag[] | string[];
  date: Date;
  align?: "left" | "right";
  title: string;
}
