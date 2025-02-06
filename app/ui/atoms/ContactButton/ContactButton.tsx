import { Link } from "react-router";
import { Contact } from "@nav";
import clsx from "clsx";

import tomek from "./assets/tomek.jpg";

import buttonStyles from "../Button/Button.module.scss";
import styles from "./ContactButton.module.scss";

function ContactButton() {
  return (
    <Link
      to={Contact.href}
      className={clsx(styles.wrapper, buttonStyles.base, buttonStyles.tertiary)}
    >
      <div className={styles.imgWrapper}>
        <img src={tomek} alt="Book a call!" />
      </div>
      Contact me
    </Link>
  );
}

export default ContactButton;
