import * as runtime from "react/jsx-runtime";
import { evaluate } from "@mdx-js/mdx";

export default async function (content: string) {
  const { default: Content } = await evaluate(content, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return { Content };
}
