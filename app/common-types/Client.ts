import type { FC, ReactNode, SVGProps } from "react";

export interface Client {
  color: string;
  name: string;
  component: FC<SVGProps<SVGSVGElement>> | ReactNode;
}
