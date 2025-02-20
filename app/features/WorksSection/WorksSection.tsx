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
    <section
      id={Sections.works}
      itemScope
      itemType="https://schema.org/CreativeWorkSeries"
    >
      <meta itemProp="name" content="Portfolio Works" />
      <meta itemProp="numberOfItems" content={String(data.length)} />

      {data.map((item, i) => (
        <WorkItem
          {...item}
          index={i}
          key={item.title}
          align={i % 2 === 0 ? "right" : "left"}
        />
      ))}
    </section>
  );
}
