const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: "medium",
});

export const date = (date: string) => {
  return dateFormatter.format(new Date(date));
};

export const year = (date: string) => {
  return new Date(date).getFullYear();
};
