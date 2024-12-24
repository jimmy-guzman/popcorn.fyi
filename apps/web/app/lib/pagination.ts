export const composePageNumbers = (currentPage: number, totalPages: number) => {
  const pageNumbers = new Set<"ellipsis-after" | "ellipsis-before" | number>();

  const [startPage, endPage] = [
    Math.max(2, currentPage - 2),
    Math.min(totalPages - 1, currentPage + 2),
  ];

  if (startPage > 2) {
    pageNumbers.add(1);
    pageNumbers.add("ellipsis-before");
  } else if (startPage === 2) {
    pageNumbers.add(1);
  }

  for (let num = startPage; num <= endPage; num++) {
    pageNumbers.add(num);
  }

  if (endPage < totalPages - 1) {
    pageNumbers.add("ellipsis-after");
    pageNumbers.add(totalPages);
  } else if (endPage === totalPages - 1) {
    pageNumbers.add(totalPages);
  }

  return [...pageNumbers];
};
