type Tag = "Design" | "Development" | "Consultation";

export interface Work {
  description: string[];
  mobileImage: string;
  desktopImage: string;
  background?: string;
  link?: string;
  study?: string;
  tags: Tag[];
  date: Date;
  align?: "left" | "right";
  title: string;
}
