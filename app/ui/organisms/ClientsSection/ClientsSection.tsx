import { useEffect, useState } from "react";
import { SectionWrapper } from "@ui/atoms";
import { AnimatePresence, motion } from "motion/react";

import type { Client } from "@common-types/Client";

import { ClientIcon } from "./helpers/ClientIcon";
import { pickRandomItems } from "./helpers/random";

import styles from "./ClientsSection.module.scss";

interface Props {
  items: Client[];
}

function ClientsSection({ items }: Props) {
  const [visibleItems, setVisibleItems] = useState<Client[]>(
    pickRandomItems(items, 7),
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setVisibleItems([]);
      setTimeout(() => {
        setVisibleItems(pickRandomItems(items, 7));
      }, 800);
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SectionWrapper title="Clients">
      <motion.div
        className={styles.wrapper}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <AnimatePresence mode="sync">
          {visibleItems.map((item, i) => (
            <ClientIcon {...item} count={i} key={item.name} />
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}

export default ClientsSection;
