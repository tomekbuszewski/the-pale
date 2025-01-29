import * as runtime from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { evaluate } from "@mdx-js/mdx";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";
import type { ReactNode } from "react";

import { cache } from "./cache";

interface LoaderConfig {
  withContent?: boolean;
  limit?: number;
  page?: number;
  slug?: string;
}

function createPagination(
  items: number,
  perPage: number,
  currentPage = 1,
): PaginationProps {
  const totalPages = Math.ceil(items / perPage);
  const pages = new Array(totalPages).fill(null).map((_, i) => i + 1);
  const nextPage = currentPage + 1;
  const prevPage = currentPage - 1;

  return {
    pages,
    currentPage,
    nextPage: nextPage <= totalPages ? nextPage : undefined,
    prevPage: prevPage > 0 ? prevPage : undefined,
  };
}

export default async function loader({
  withContent = true,
  limit = Number.MAX_SAFE_INTEGER,
  page = 1,
}: LoaderConfig) {
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
            title: data.title as string,
            date: data.pubdate as Date,
            children: data.summary as string,
            tags: (data.tags as string).split(", "),
            youtube: data.youtube as string,
          } as BlogPost;

          if (withContent) {
            newPost.cnt = renderToString(
              Content({
                components: {
                  h3: "h1",
                  h2: "h1",
                },
              }) as ReactNode,
            );
          }

          posts.push(newPost);

          cache.set(newPost.link, newPost);

          break;
        } catch {
          // Continue to next file if current one doesn't exist
        }
      }
    }

    const items = posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .splice(0, limit);

    return {
      items,
      pagination: createPagination(posts.length, limit, page),
    };
  } catch (error) {
    console.error("Error loading blog posts:", error);
    return {};
  }
}
