import { Children, useRef } from "react";
import clsx from "clsx";
import { motion, useTransform } from "motion/react";

import type { MotionValue } from "motion/react";
import type { ReactNode } from "react";

import styles from "./AboutSection.module.scss";

export const DEFAULT_OPACITY = 0.05;
const BLUR_CLS = styles.blur;

export function Span({
  children,
  index,
  progress,
  total,
}: {
  children: ReactNode;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const item = useRef<HTMLSpanElement>(null);
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [DEFAULT_OPACITY, 1],
  );

  return (
    <motion.span
      ref={item}
      className={clsx(BLUR_CLS, "transition-all")}
      style={{ opacity }}
      onUpdate={(latest) => {
        if (latest.opacity === 1) {
          item.current?.classList.remove(BLUR_CLS);
        } else {
          item.current?.classList.add(BLUR_CLS);
        }
      }}
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  );
}

export const makeTextIntoSpans = (children: string) => {
  return Children.map(children, (child) => {
    return (child as string) /* I know what I am putting here */
      .split(/(\s+)/)
      .map((part) => {
        if (part === "<br/>" || part === "<br />") {
          return "<br /><br />";
        }

        return part as string;
      });
  });
};
