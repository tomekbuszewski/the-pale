import { Text } from "@ui/atoms";
import { createMotionConfig } from "@utils/fadeIn";
import { motion } from "motion/react";

import CodeIcon from "../assets/code.svg?react";
import ConsultationIcon from "../assets/consultations.svg?react";
import DesignIcon from "../assets/design.svg?react";

import styles from "../WorkItem.module.scss";

interface TagsProps {
  tags: string[];
}

function resolveIcon(tag: string) {
  switch (tag) {
    case "work.item.tag.design":
      return <DesignIcon />;
    case "work.item.tag.development":
      return <CodeIcon />;
    case "work.item.tag.consultations":
      return <ConsultationIcon />;

    default:
      throw new Error("Unknown tag");
  }
}

export function Tags(props: TagsProps) {
  return (
    <motion.ul className={styles.tags} {...createMotionConfig(3)}>
      {props.tags.map((tag) => (
        <Text variant="list" key={tag} className={styles.tag}>
          {resolveIcon(tag)}
          {tag}
        </Text>
      ))}
    </motion.ul>
  );
}
