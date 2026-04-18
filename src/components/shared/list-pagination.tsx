import { Link } from "@tanstack/react-router";

import { cn } from "@/lib/cn";
import { composePageNumbers } from "@/lib/pagination";
import {
  paginationEllipsisClassName,
  paginationLinkActiveClassName,
  paginationLinkClassName,
} from "@/lib/styles/route-ui";

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
      <div className="inline-flex overflow-hidden rounded border border-border shadow-sm">
        {page !== 1 && (
          <Link
            aria-label="Previous Page"
            className={cn(paginationLinkClassName, "hidden md:flex")}
            search={(prev) => ({
              ...prev,
              page: (prev.page ?? 1) - 1,
            })}
            to="."
          >
            <span className="icon-[lucide--chevron-left] size-4" />
          </Link>
        )}
        {pageNumbers.map((pageNum) => {
          return pageNum === "ellipsis-before" ||
            pageNum === "ellipsis-after" ? (
            <button
              aria-label="Ellipsis"
              className={cn(paginationEllipsisClassName, "hidden md:block")}
              disabled
              key={pageNum}
              type="button"
            >
              <span className="icon-[lucide--ellipsis] size-4" />
            </button>
          ) : (
            <Link
              activeProps={{ className: paginationLinkActiveClassName }}
              className={paginationLinkClassName}
              key={pageNum}
              search={(prev) => ({
                ...prev,
                page: pageNum,
              })}
              to="."
            >
              {pageNum}
            </Link>
          );
        })}
        {totalPages !== page && (
          <Link
            aria-label="Next Page"
            className={cn(paginationLinkClassName, "hidden md:flex")}
            search={(prev) => ({
              ...prev,
              page: (prev.page ?? 1) + 1,
            })}
            to="."
          >
            <span className="icon-[lucide--chevron-right] size-4" />
          </Link>
        )}
      </div>
    </div>
  );
};
