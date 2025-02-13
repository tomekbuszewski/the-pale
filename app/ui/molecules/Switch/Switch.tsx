import {
  type CSSProperties,
  type HTMLProps,
  useCallback,
  useEffect,
  useState,
} from "react";
import clsx from "clsx";

import type { Href } from "@common-types/Href";

import styles from "./Switch.module.scss";

interface Props extends Omit<HTMLProps<HTMLDivElement>, "onChange"> {
  items: Href[];
  onChange: (value: string) => void;
  defaultActiveIndex?: number;
}

function Switch({
  items,
  onChange: onChangeRaw,
  defaultActiveIndex,
  className,
  ...rest
}: Props) {
  const [active, setActive] = useState<number>(defaultActiveIndex ?? 0);
  const onChange = useCallback(onChangeRaw, [onChangeRaw]);
  const classNames = clsx(className, styles.wrapper);

  useEffect(() => {
    onChange(items[active].href);
  }, [active, items, onChange]);

  return (
    <div
      {...rest}
      className={classNames}
      style={{
        ["--active" as keyof CSSProperties]: active,
      }}
    >
      {items.map((item, index) => (
        <button
          key={item.href}
          onClick={() => setActive(index)}
          className={clsx(styles.item, {
            [styles.active]: index === active,
          })}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Switch;
