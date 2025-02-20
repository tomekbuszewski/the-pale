import clsx from "clsx";

import {
  type ButtonHTMLAttributes,
  type MouseEvent,
  useEffect,
  useState,
} from "react";

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
  const [visible, setVisible] = useState(false);
  const classNames = [styles.button, className, isOpen && styles.open];
  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    if (isOpen) {
      onClose?.();
    } else {
      onOpen?.();
    }
  }

  useEffect(() => {
    setVisible(window.matchMedia("(max-width: 1200px)").matches);
  }, [visible, setVisible]);

  return (
    <button
      {...rest}
      onClick={handleClick}
      className={clsx(classNames)}
      aria-expanded={isOpen ? "true" : "false"}
      inert={!visible}
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
