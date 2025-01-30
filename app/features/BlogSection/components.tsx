// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { Text } from "@ui/atoms";

export const components = {
  p: (props) => <Text {...props} variant="article-body" />,
  h2: (props) => <Text {...props} variant="h2" />,
  h3: (props) => <Text {...props} variant="h3" />,
  h4: (props) => <Text {...props} variant="h4" />,
  blockquote: (props) => <Text {...props} variant="blockquote" />,
  ul: (props) => <Text {...props} variant="ul" />,
  li: (props) => <Text {...props} variant="list" />,
};
