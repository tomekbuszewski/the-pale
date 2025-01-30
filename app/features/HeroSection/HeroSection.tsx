import { TextRotate } from "@ui/atoms";
import { HeroSection as Main } from "@ui/organisms";

export default function HeroSection() {
  return (
    <Main
      copy="Say goodbye to website headaches. Enjoy seamless, worry-free solutions
        so you can focus on growing your product and business."
    >
      <>
        Need&nbsp;a&nbsp;
        <TextRotate
          staggerFrom="last"
          texts={["design", "code", "consultant", "website"]}
        />
        <br />
        for&nbsp;your&nbsp;business?
      </>
    </Main>
  );
}
