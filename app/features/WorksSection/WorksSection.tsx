import { Sections } from "@nav";
import { WorkItem } from "@ui/molecules";

import Gameshelf from "./items/gameshelf";
import Hay24 from "./items/hay24";
import Backlog from "./items/thebacklog";

const data = [Gameshelf, Backlog, Hay24].sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);

export default function WorksSection() {
  return (
    <section id={Sections.works}>
      {data.map((item, i) => (
        <WorkItem
          {...item}
          key={item.title}
          align={i % 2 === 0 ? "right" : "left"}
        />
      ))}
    </section>
  );
}
