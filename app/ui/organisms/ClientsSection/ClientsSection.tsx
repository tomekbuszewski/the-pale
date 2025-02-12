import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Sections } from "@nav";
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
  const [ready, setReady] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Client[]>([]);
  const intervalId = useRef<NodeJS.Timeout | null>(null);
  const isFirstRender = useRef(true);

  function triggerIntervalRaw() {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setVisibleItems(pickRandomItems(items, 7));
    }

    intervalId.current = setInterval(() => {
      setVisibleItems([]);
      setTimeout(() => {
        setVisibleItems(pickRandomItems(items, 7));
      }, 800);
    }, 4000);
  }

  const triggerInterval = useCallback(triggerIntervalRaw, [items]);

  function handleMouseEnter() {
    clearInterval(intervalId.current!);
  }

  function handleMouseLeave() {
    triggerInterval();
  }

  useEffect(() => {
    triggerInterval();

    return () => clearInterval(intervalId.current!);
  }, [triggerInterval]);

  useLayoutEffect(() => {
    if (ready) return;

    setReady(true);
  }, [ready]);

  if (!ready) return null;

  return (
    <SectionWrapper title="Clients" id={Sections.clients}>
      <motion.div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
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
