import clsx from "clsx";

import type { SVGProps } from "react";

import Image from "./assets/Logo.svg?react";

import styles from "./Logo.module.scss";
import { Content } from "@features";

interface Props extends SVGProps<SVGSVGElement> {
  title?: string;
  wrapperClassName?: string;
}

function Logo({ title = "Buszewski.com", wrapperClassName, ...rest }: Props) {
  const { Link } = Content.components;

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
