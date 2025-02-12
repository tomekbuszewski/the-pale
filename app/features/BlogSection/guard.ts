import type { PaginationProps } from "@common-types/BlogPagination";
import type { BlogPost } from "@common-types/Blogpost";

export default function (
  input: unknown,
): input is { items: BlogPost[]; pagination: PaginationProps } {
  console.log("INPUT", input);
  if (typeof input === "object" && input !== null) {
    const hasItems = "items" in input && (input.items as BlogPost[]).length > 0;
    const hasPosts = hasItems && "link" in (input.items as BlogPost[])[0];
    const hasPagination = "pagination" in input;

    console.log({ hasPagination, hasPosts, hasItems });

    return hasItems && hasPosts && hasPagination;
  }

  return false;
}
