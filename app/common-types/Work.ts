type Tag =
  | "work.item.tag.design"
  | "work.item.tag.development"
  | "work.item.tag.consultation";

export interface Work {
  description: string | string[];
  mobileImage: string | OutputMetadata;
  desktopImage: string | OutputMetadata;
  background?: string;
  link?: string;
  study?: string;
  tags: Tag[];
  date: Date;
  align?: "left" | "right";
  title: string;
}
