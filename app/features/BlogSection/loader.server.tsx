import { type ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { evaluate } from "@mdx-js/mdx";
import shiki from "@shikijs/rehype";
import fs from "fs/promises";
import matter from "gray-matter";
import path from "path";

import type { PaginationProps } from "../../common-types/BlogPagination";
import type { BlogPost } from "../../common-types/Blogpost";

import { Routes } from "../../nav";

import { cache } from "./cache";

interface LoaderConfig {
  withContent?: boolean;
  limit?: number;
  page?: number;
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
            const cachedPost = cache.get(data.slug);

            if (cachedPost) {
              posts.push(cachedPost);
            }

            break;
          }

          const newPost: BlogPost = {
            link: {
              href: Routes.post.replace(":slug", data.slug),
              label: data.title as string,
            },
            title: data.title as string,
            date: data.pubdate as Date,
            children: data.summary as string,
            tags: (data.tags as string).split(", "),
            youtube: data.youtube as string,
          };

          if (withContent) {
            const { default: Content } = await evaluate(content, {
              ...runtime,
              baseUrl: import.meta.url,
              rehypePlugins: [
                [
                  shiki,
                  {
                    themes: {
                      light: "material-theme-lighter",
                      dark: "catppuccin-mocha",
                    },
                  },
                ],
              ],
            });

            const { components } = await import("./components");

            newPost.cnt = renderToString(
              Content({
                components,
              }) as ReactNode,
            );

            cache.set(data.slug, newPost);
          }

          posts.push(newPost);

          break;
        } catch {
          // Continue to next file if current one doesn't exist
        }
      }
    }

    const startIndex = (page - 1) * limit;
    const items = posts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(startIndex, startIndex + limit);

    return {
      items,
      pagination: createPagination(posts.length, limit, page),
    };
  } catch (error) {
    console.error(
      "Error loading blog posts:",
      error instanceof Error ? error.message : String(error),
    );
    return {};
  }
}
