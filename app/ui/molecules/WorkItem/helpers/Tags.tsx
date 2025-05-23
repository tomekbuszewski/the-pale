import { Content } from "@features";
import { createMotionConfig } from "@utils/fadeIn";
import { motion } from "motion/react";

import { Text } from "@ui/atoms";

import CodeIcon from "../assets/code.svg?react";
import ConsultationIcon from "../assets/consultations.svg?react";
import DesignIcon from "../assets/design.svg?react";
import MaintenanceIcon from "../assets/maintenance.svg?react";

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
    case "work.item.tag.maintenance":
      return <MaintenanceIcon />;

    default:
      throw new Error("Unknown tag");
  }
}

export function Tags(props: TagsProps) {
  const translate = Content.hooks.useTranslate();
  return (
    <motion.ul className={styles.tags} {...createMotionConfig(3)}>
      {props.tags.map((tag) => (
        <Text variant="list" key={tag} className={styles.tag}>
          {resolveIcon(tag)}
          {translate(tag)}
        </Text>
      ))}
    </motion.ul>
  );
}
