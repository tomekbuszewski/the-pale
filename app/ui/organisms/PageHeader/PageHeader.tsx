import { useMemo, useState } from "react";
import { Link } from "react-router";
import { useIsMobile } from "@hooks";
import { ContactButton, Logo, MenuToggleButton } from "@ui/atoms";
import { PageNavigation } from "@ui/organisms";
import { translate } from "@utils/translate";
import clsx from "clsx";
import {
  type HTMLMotionProps,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";

import ContactIcon from "./assets/Phone.svg?react";

import styles from "./PageHeader.module.scss";

interface Props extends HTMLMotionProps<"header"> {
  links: { text: string; href: string }[];
}

function useHiddenHeader(threshold = 160) {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > lastScrollY && latest > threshold) {
      setIsVisible(false);
    } else if (latest < lastScrollY) {
      setIsVisible(true);
    }

    setLastScrollY(latest);
  });

  return [isVisible, scrollY.get() === 0];
}

function PageHeader({ className, links, ...rest }: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isVisible, isOnTop] = useHiddenHeader(0);
  const navigationLinks = links.slice(0, -1);
  const contactLink = links[links.length - 1];

  const hideMenu = useMemo(() => {
    if (isMobile) {
      return !isVisible && !isMenuOpen;
    }

    return !isVisible;
  }, [isMobile, isVisible, isMenuOpen]);

  const classNames = [className, styles.header];

  return (
    <motion.header
      data-top={isOnTop}
      {...rest}
      role="banner"
      className={clsx(classNames, {
        [styles.hidden]: hideMenu,
        [styles.full]: !isOnTop,
      })}
      inert={!isVisible}
    >
      <div className={styles.inner}>
        <MenuToggleButton
          isOpen={isMenuOpen}
          onOpen={() => setIsMenuOpen(true)}
          onClose={() => setIsMenuOpen(false)}
        />

        <PageNavigation
          links={navigationLinks}
          visible={isMenuOpen}
          onLinkClick={() => {
            setTimeout(() => setIsMenuOpen(false), 1000);
          }}
        />

        <Logo className={styles.logo} />

        <Link
          to={contactLink.href}
          className={styles.contact}
          aria-label={translate("nav.buttons.phone")}
        >
          <ContactIcon />
        </Link>
        <ContactButton />
      </div>
    </motion.header>
  );
}

export default PageHeader;
