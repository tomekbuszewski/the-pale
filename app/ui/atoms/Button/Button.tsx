import { Link } from "react-router";
import clsx from "clsx";

import type { LinkProps } from "react-router";

import styles from "./Button.module.scss";

interface Props extends LinkProps {
  variant?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  small?: boolean;
}

function Button({ variant, className, small, disabled, ...rest }: Props) {
  const classNames = [
    className,
    styles.base,
    styles[variant ?? "primary"],
    {
      [styles.disabled]: disabled,
    },
  ];

  if (disabled) {
    rest.onClick = (e) => {
      e.preventDefault();
      return false;
    };
  }

  if ("target" in rest && rest.target === "_blank") {
    rest.rel = "noreferrer noopener";
  }

  return (
    <Link
      viewTransition
      className={clsx(classNames, {
        [styles.small]: small,
      })}
      {...rest}
    />
  );
}

export default Button;
