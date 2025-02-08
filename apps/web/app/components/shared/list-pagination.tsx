import { Button } from "@popcorn.fyi/ui/button";
import { Link } from "@tanstack/react-router";

import { composePageNumbers } from "@/lib/pagination";

interface ListPaginationProps {
  page: number;
  totalPages: number;
}

export const ListPagination = ({ page, totalPages }: ListPaginationProps) => {
  const pageNumbers = composePageNumbers(page, Math.min(totalPages, 500));

  return (
    <div className="flex justify-center">
      <div className="dsy-join">
        {page !== 1 && (
          <Button aria-label="Previous Page" asChild>
            <Link
              className="dsy-join-item hidden md:flex"
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
          </Button>
        )}
        {pageNumbers.map((page) => {
          return page === "ellipsis-before" || page === "ellipsis-after" ? (
            <Button
              aria-label="Ellipsis"
              className="dsy-join-item hidden md:block"
              disabled
              key={page}
            >
              <span className="icon-[lucide--ellipsis] h-4 w-4" />
            </Button>
          ) : (
            <Button asChild key={page}>
              <Link
                activeProps={{ className: "dsy-btn-active" }}
                className="dsy-join-item"
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
            </Button>
          );
        })}
        {totalPages !== page && (
          <Button aria-label="Next Page" asChild>
            <Link
              className="dsy-join-item hidden md:flex"
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
          </Button>
        )}
      </div>
    </div>
  );
};
