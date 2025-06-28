import { Link } from "@tanstack/react-router";

import { composePageNumbers } from "@/lib/pagination";

const MAX_TOTAL_PAGES = 500;

interface ListPaginationProps {
  page: number;
  totalPages: number;
}

export const ListPagination = ({ page, totalPages }: ListPaginationProps) => {
  const pageNumbers = composePageNumbers(
    page,
    Math.min(totalPages, MAX_TOTAL_PAGES),
  );

  return (
    <div
      aria-label="Pagination Navigation"
      className="flex justify-center"
      role="navigation"
    >
      <div className="dsy-join">
        {page !== 1 && (
          <Link
            aria-label="Previous Page"
            className="dsy-join-item dsy-btn hidden md:flex"
            search={(prev) => {
              return {
                ...prev,
                page: (prev.page ?? 1) - 1,
              };
            }}
            to="."
          >
            <span className="icon-[lucide--chevron-left] h-4 w-4" />
          </Link>
        )}
        {pageNumbers.map((page) => {
          return page === "ellipsis-before" || page === "ellipsis-after" ? (
            <button
              aria-label="Ellipsis"
              className="dsy-join-item dsy-btn hidden md:block"
              disabled
              key={page}
              type="button"
            >
              <span className="icon-[lucide--ellipsis] h-4 w-4" />
            </button>
          ) : (
            <Link
              activeProps={{ className: "dsy-btn-active" }}
              className="dsy-join-item dsy-btn"
              key={page}
              search={(prev) => {
                return {
                  ...prev,
                  page,
                };
              }}
              to="."
            >
              {page}
            </Link>
          );
        })}
        {totalPages !== page && (
          <Link
            aria-label="Next Page"
            className="dsy-join-item dsy-btn hidden md:flex"
            search={(prev) => {
              return {
                ...prev,
                page: (prev.page ?? 1) + 1,
              };
            }}
            to="."
          >
            <span className="icon-[lucide--chevron-right] h-4 w-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
