import type { Client } from "../ClientsSection.types";

export const itemVariants = {
  initial: { opacity: 0, blur: 100 },
  animate: { opacity: 1, blur: 0 },
  exit: { opacity: 0, blur: 100 },
};

export function pickRandomItems(arr: Client[], count: number) {
  const newArr = [...arr];
  newArr.sort(() => Math.random() - 0.5); // Shuffle the array
  return newArr.slice(0, count);
}
