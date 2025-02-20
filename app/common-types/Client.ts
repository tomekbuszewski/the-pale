import type { FC, SVGProps } from "react";

export interface Client {
  color: string;
  name: string;
  component: FC<SVGProps<SVGSVGElement>>;
}
