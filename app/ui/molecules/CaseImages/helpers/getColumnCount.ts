import type { Props } from "../CaseImages.types";

export function getColumnCount(mode: Props["mode"]) {
  switch (mode) {
    case "mobile":
    default:
      return 3;
    case "desktop":
      return 1;
    case "tablet":
      return 2;
  }
}
