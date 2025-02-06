import type { HTMLProps } from "react";

import Icon from "./assets/separator.svg?react";

import "./Separator.scss";

function Separator(props: HTMLProps<HTMLDivElement>) {
  return (
    <div className="separator" {...props}>
      <Icon />
    </div>
  );
}

export default Separator;
