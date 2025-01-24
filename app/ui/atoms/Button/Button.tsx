import { Link } from "react-router";
import clsx from "clsx";

import type { LinkProps } from "react-router";

import styles from "./Button.module.scss";

interface Props extends LinkProps {
  variant?: "primary" | "secondary" | "tertiary" | "disabled";
  small?: boolean;
}

function Button({ variant, className, small, ...rest }: Props) {
  const classNames = [className, styles.base, styles[variant ?? "primary"]];

  if (variant === "disabled") {
    rest.onClick = (e) => {
      e.preventDefault();
      return false;
    };
  }

  return (
    <Link
      className={clsx(classNames, {
        [styles.small]: small,
      })}
      {...rest}
    />
  );
}

export default Button;
