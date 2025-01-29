import * as runtime from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { evaluate } from "@mdx-js/mdx";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

import type { BlogPost } from "@common-types/Blogpost";
import type { ReactNode } from "react";

import { cache } from "./cache";

export default async function loader() {
  const contentDir = path.join(
    process.cwd(),
    "app/features/BlogSection/content",
  );
  const posts: BlogPost[] = [];

  try {
    const directories = await fs.readdir(contentDir);

    for (const dir of directories) {
      const possibleFiles = [
        path.join(contentDir, dir, "index.md"),
        path.join(contentDir, dir, "index.mdx"),
      ];

      for (const filePath of possibleFiles) {
        try {
          await fs.access(filePath);
          const fileContent = await fs.readFile(filePath, "utf-8");
          const { data, content } = matter(fileContent);

          if (!data || !content || typeof data.slug !== "string") {
            throw new Error("Invalid file format");
          }

          if (cache.has(data.slug)) {
            posts.push(cache.get(data.slug)!);
            break;
          }

          const { default: Content } = await evaluate(content, {
            ...runtime,
            baseUrl: import.meta.url,
          });

          const newPost = {
            link: "/writings/" + data.slug,
            cnt: renderToString(
              Content({
                components: {
                  h3: "h1",
                  h2: "h1",
                },
              }) as ReactNode,
            ),
            content: Content,
            title: data.title as string,
            date: data.pubdate as Date,
            summary: data.summary as string,
            tags: (data.tags as string).split(", "),
            youtube: data.youtube as string,
          } as BlogPost;

          posts.push(newPost);

          cache.set(newPost.link, newPost);

          break;
        } catch {
          // Continue to next file if current one doesn't exist
        }
      }
    }

    return posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return [];
  }
}
