import type { LinkProps } from "react-router";

export interface ButtonProps extends LinkProps {
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  small?: boolean;
}
