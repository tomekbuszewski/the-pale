import { Link } from "react-router";
import clsx from "clsx";

import type { LinkProps } from "react-router";

import styles from "./Button.module.scss";

interface Props extends LinkProps {
  variant?: "primary" | "secondary" | "tertiary";
}

function Button({ variant, className, ...rest }: Props) {
  const classNames = [className, styles.base, styles[variant ?? "primary"]];

  return <Link className={clsx(classNames)} {...rest} />;
}

export default Button;
