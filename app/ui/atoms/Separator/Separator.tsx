import type { HTMLProps } from "react";

import Icon from "./assets/separator.svg?react";

function Separator(props: HTMLProps<HTMLDivElement>) {
  return (
    <div {...props}>
      <Icon />
    </div>
  );
}

export default Separator;
