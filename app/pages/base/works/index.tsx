import { SectionWrapper } from "@ui/atoms";
import { ArticleHeader } from "@ui/molecules";

export function loader() {
  console.log("loader");
  return null;
}

export default function Works() {
  return (
    <SectionWrapper tag="article" contentClassName="largeText">
      <ArticleHeader title="Hello" />
    </SectionWrapper>
  );
}
