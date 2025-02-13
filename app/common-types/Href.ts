import type { ButtonProps } from "@common-types/Button";

export interface Href {
  href: string;
  label: string;
  external?: boolean;
  title?: string;
  variant?: ButtonProps["variant"];
}
