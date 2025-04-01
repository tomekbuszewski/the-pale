import { default as EwaCool } from "./ewa-cool";

interface Props {
  name: string;
}

const works = [
  {
    url: "ewa-cool",
    component: EwaCool,
  },
];

export function CaseStudies(name: string) {
  const work = works.find((item) => item.url === name);

  if (work) {
    return work;
  }

  throw new Error("No such work!");
}
