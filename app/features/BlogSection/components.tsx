// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Text } from "@ui/atoms";
import { SectionHeader } from "@ui/molecules";

interface Props {
  children: string;
}

export const components = {
  p: (props: Props) => <Text {...props} variant="article-body" />,
  h2: (props: Props) => (
    <SectionHeader animate={false} level={2} id={props.children} {...props} />
  ),
  h3: (props: Props) => (
    <SectionHeader animate={false} level={3} id={props.children} {...props} />
  ),
  h4: (props: Props) => (
    <SectionHeader animate={false} level={4} id={props.children} {...props} />
  ),
  h5: (props: Props) => (
    <SectionHeader animate={false} level={5} id={props.children} {...props} />
  ),
  h6: (props: Props) => (
    <SectionHeader animate={false} level={6} id={props.children} {...props} />
  ),
  blockquote: (props) => <Text {...props} variant="blockquote" />,
  ul: (props) => <Text {...props} variant="ul" />,
  li: (props) => <Text {...props} variant="list" />,
  pre: (props) => <Text {...props} variant="pre" />,
  code: (props) => <Text {...props} variant="code" />,
};
