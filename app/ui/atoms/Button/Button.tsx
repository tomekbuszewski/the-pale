import { Link } from "react-router";
import clsx from "clsx";

import type { ButtonProps } from "@common-types/Button";

import styles from "./Button.module.scss";

function Button({ variant, className, small, disabled, ...rest }: ButtonProps) {
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
