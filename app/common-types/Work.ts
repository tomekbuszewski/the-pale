type Tag = "Design" | "Development" | "Consultation";

export interface Work {
  description: string[];
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
