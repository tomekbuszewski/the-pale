import clsx from "clsx";

import type { ButtonHTMLAttributes, MouseEvent } from "react";

import styles from "./MenuToggleButton.module.scss";

type Base = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">;

interface Props extends Base {
  onOpen?: () => void;
  onClose?: () => void;
  isOpen?: boolean;
}

function MenuToggleButton({
  onOpen,
  isOpen,
  onClose,
  className,
  ...rest
}: Props) {
  const classNames = [styles.button, className, isOpen && styles.open];

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
  }

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={clsx(classNames)}
      aria-expanded={isOpen ? "true" : "false"}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
      <div className={styles.wrapper}>
        <span className={styles.line} />
        <span className={clsx(styles.line, styles.short)} />
        <span className={styles.line} />
      </div>
    </button>
  );
}

export default MenuToggleButton;
