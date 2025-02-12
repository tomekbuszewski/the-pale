import { useLayoutEffect, useState } from "react";
import { Link } from "react-router";
import { Contact } from "@nav";
import clsx from "clsx";

import tomek from "./assets/tomek.jpg";

import buttonStyles from "../Button/Button.module.scss";
import styles from "./ContactButton.module.scss";

function ContactButton() {
  const [loaded, setLoaded] = useState(false);

  useLayoutEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Link
      to={Contact.href}
      className={clsx(
        styles.wrapper,
        buttonStyles.base,
        buttonStyles.tertiary,
        {
          [styles.hidden]: !loaded,
        },
      )}
    >
      <div className={styles.imgWrapper}>
        <img src={loaded ? tomek : undefined} alt="Book a call!" />
      </div>
      Contact me
    </Link>
  );
}

export default ContactButton;
