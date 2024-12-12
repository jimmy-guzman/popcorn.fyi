const yearOnlyFormatter = new Intl.DateTimeFormat("en-US", { year: "numeric" });

export const formatDateAsYearOnly = (date: string) => {
  return yearOnlyFormatter.format(new Date(date));
};
