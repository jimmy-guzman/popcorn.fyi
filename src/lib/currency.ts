const currencyFormatter = new Intl.NumberFormat("en", {
  currency: "USD",
  minimumFractionDigits: 0,
  style: "currency",
});

export const currency = (value: number) => {
  return currencyFormatter.format(value);
};
