import { WorkItem } from "@ui/molecules";

import Gameshelf from "./items/gameshelf";
import Hay24 from "./items/hay24";
import Backlog from "./items/thebacklog";

const data = [Gameshelf, Backlog, Hay24].sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);

export default function WorksSection() {
  return (
    <section id="works">
      {data.map((item) => (
        <WorkItem {...item} key={item.title} />
      ))}
    </section>
  );
}
