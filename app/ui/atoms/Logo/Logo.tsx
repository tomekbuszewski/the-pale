import { Link } from "react-router";
import clsx from "clsx";

import type { SVGProps } from "react";

import Image from "./assets/Logo.svg?react";

import styles from "./Logo.module.scss";

interface Props extends SVGProps<SVGSVGElement> {
  title?: string;
  wrapperClassName?: string;
}

function Logo({
  title = "Buszewski.studio",
  wrapperClassName,
  ...rest
}: Props) {
  return (
    <figure className={clsx(wrapperClassName, styles.wrapper)}>
      <Link to="/" viewTransition>
        <Image {...rest} />
        <figcaption className="sr-only">{title}</figcaption>
      </Link>
    </figure>
  );
}

export default Logo;
