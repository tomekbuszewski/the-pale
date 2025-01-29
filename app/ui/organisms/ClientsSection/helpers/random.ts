import type { Client } from "@common-types/Client";

export const itemVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export function pickRandomItems(arr: Client[], count: number) {
  const newArr = [...arr];
  newArr.sort(() => Math.random() - 0.5); // Shuffle the array
  return newArr.slice(0, count);
}
