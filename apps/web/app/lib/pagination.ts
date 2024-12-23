export const composePageNumbers = (currentPage: number, totalPages: number) => {
  const pageNumbers: ("ellipsis-after" | "ellipsis-before" | number)[] = [];

  const [startPage, endPage] = [
    Math.max(2, currentPage - 2),
    Math.min(totalPages - 1, currentPage + 2),
  ];

  if (startPage > 2) {
    pageNumbers.push(1, "ellipsis-before" as const);
  } else if (startPage === 2) {
    pageNumbers.push(1);
  }

  for (let num = startPage; num <= endPage; num++) {
    pageNumbers.push(num);
  }

  if (endPage < totalPages - 1) {
    pageNumbers.push("ellipsis-after" as const, totalPages);
  } else if (endPage === totalPages - 1) {
    pageNumbers.push(totalPages);
  }

  return pageNumbers;
};
