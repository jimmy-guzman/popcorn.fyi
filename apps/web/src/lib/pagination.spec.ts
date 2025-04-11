import { composePageNumbers } from "./pagination";

describe("composePageNumbers", () => {
  it("should compose page numbers", () => {
    const pageNumbers = composePageNumbers(1, 500);

    expect(pageNumbers).toStrictEqual([1, 2, 3, "ellipsis-after", 500]);
  });

  it("should compose page numbers when start page is greater than 2", () => {
    const pageNumbers = composePageNumbers(5, 500);

    expect(pageNumbers).toStrictEqual([
      1,
      "ellipsis-before",
      3,
      4,
      5,
      6,
      7,
      "ellipsis-after",
      500,
    ]);
  });

  it("should compose page numbers when total pages is equal to current page", () => {
    const pageNumbers = composePageNumbers(10, 10);

    expect(pageNumbers).toStrictEqual([1, "ellipsis-before", 8, 9, 10]);
  });

  it("should not show duplicate page numbers", () => {
    const pageNumbers = composePageNumbers(1, 1);

    expect(pageNumbers).toStrictEqual([1]);
  });
});
