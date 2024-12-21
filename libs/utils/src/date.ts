const yearOnlyFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });

export const formatDateAsYearOnly = (date: string) => {
  return yearOnlyFormatter.format(new Date(date));
};

const longMonthFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatDateAsLongMonth = (date: string) => {
  return longMonthFormatter.format(new Date(date));
};
