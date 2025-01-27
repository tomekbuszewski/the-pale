import { Button } from "@ui/atoms";

import styles from "./BlogSection.module.scss";

export interface PaginationProps {
  nextPage?: number;
  pages: number[];
  currentPage: number;
  prevPage?: number;
}

function link(page: number) {
  return `/writings/page/${page}`;
}

export function Pagination({
  prevPage,
  pages,
  nextPage,
  currentPage,
}: PaginationProps) {
  const displayPages = pages.reduce<number[]>((acc, page) => {
    if (
      page === 1 ||
      page === pages.length ||
      (page >= currentPage - 3 && page <= currentPage)
    ) {
      acc.push(page);
    } else if (acc[acc.length - 1] !== -1) {
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
          <Button
            variant="primary"
            to={link(prevPage)}
            className={styles.button}
          >
            Newer
          </Button>
        ) : null}
        {displayPages.map((page, index) => {
          const current = page === currentPage;
          return page === -1 ? (
            <Button variant="primary" disabled key={`ellipsis-${index}`} to="#">
              ...
            </Button>
          ) : (
            <li key={page}>
              <Button
                small
                aria-current={current ? "true" : "false"}
                variant={current ? "primary" : "secondary"}
                to={link(page)}
              >
                {page}
              </Button>
            </li>
          );
        })}
        {nextPage ? (
          <Button variant="primary" to={link(nextPage)}>
            Older
          </Button>
        ) : null}
      </ul>
    </nav>
  );
}
