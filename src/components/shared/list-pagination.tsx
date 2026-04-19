import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { composePageNumbers } from "@/lib/pagination";

const MAX_TOTAL_PAGES = 500;

interface PageSearch {
  page?: number;
}

interface ListPaginationProps {
  page: number;
  totalPages: number;
}

export const ListPagination = ({ page, totalPages }: ListPaginationProps) => {
  const cappedTotalPages = Math.min(totalPages, MAX_TOTAL_PAGES);
  const pageNumbers = composePageNumbers(page, cappedTotalPages);

  return (
    <Pagination aria-label="Pagination Navigation">
      <PaginationContent>
        {page === 1 ? null : (
          <PaginationItem>
            <PaginationPrevious
              aria-label="Previous Page"
              search={(prev: PageSearch) => {
                return { ...prev, page: (prev.page ?? 1) - 1 };
              }}
              text=""
              to="."
            />
          </PaginationItem>
        )}
        {pageNumbers.map((pageNum) => {
          return pageNum === "ellipsis-before" ||
            pageNum === "ellipsis-after" ? (
            <PaginationItem key={pageNum}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={pageNum}>
              <PaginationLink
                isActive={pageNum === page}
                search={(prev: PageSearch) => ({
                  ...prev,
                  page: pageNum,
                })}
                size="default"
                to="."
              >
                {pageNum}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        {page >= cappedTotalPages ? null : (
          <PaginationItem>
            <PaginationNext
              aria-label="Next Page"
              search={(prev: PageSearch) => {
                return { ...prev, page: (prev.page ?? 1) + 1 };
              }}
              text=""
              to="."
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
