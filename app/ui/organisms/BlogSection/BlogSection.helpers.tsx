import { Routes } from "@nav";
import { Button } from "@ui/atoms";

import type { PaginationProps } from "@common-types/BlogPagination";

import styles from "./BlogSection.module.scss";
import { Content } from "@features";

function link(page: number) {
  return Routes.pagination.replace(":page", page.toString());
}

export function Pagination({
  prevPage,
  pages,
  nextPage,
  currentPage,
}: PaginationProps) {
  const totalPages = pages.length;
  const translate = Content.hooks.useTranslate();

  const displayPages = pages.reduce<number[]>((acc, page) => {
    if (
      page === 1 ||
      page === totalPages ||
      (page >= currentPage - 2 && page <= currentPage + 2)
    ) {
      if (!acc.includes(page)) {
        acc.push(page);
      }
    } else if (acc[acc.length - 1] !== -1 && acc.length > 0) {
      acc.push(-1);
    }
    return acc;
  }, []);

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={styles.pagination}
    >
      <ul className={styles.paginationContainer}>
        {prevPage ? (
          <li>
            <Button
              variant="primary"
              to={link(prevPage)}
              className={styles.button}
            >
              {translate("blog.section.pagination.newer")}
            </Button>
          </li>
        ) : null}
        {displayPages.map((page, index) => {
          const current = page === currentPage;
          return page === -1 ? (
            <li key="...">
              <Button
                variant="primary"
                disabled
                key={`ellipsis-${index}`}
                to="#"
              >
                ...
              </Button>
            </li>
          ) : (
            <li key={page}>
              <Button
                small
                aria-current={current ? "true" : "false"}
                variant={current ? "primary" : "tertiary"}
                to={link(page)}
              >
                {page}
              </Button>
            </li>
          );
        })}
        {nextPage ? (
          <li>
            <Button variant="primary" to={link(nextPage)}>
              {translate("blog.section.pagination.older")}
            </Button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
