const second = 1000;
const minute = second * 60;

const units = { minute, second };

const plural = (
  milliseconds: number,
  absoluteMilliseconds: number,
  name: "minute" | "second",
) => {
  const unit = units[name];
  const isPlural = absoluteMilliseconds >= unit * 1.5;

  return `${Math.round(milliseconds / unit)} ${name}${isPlural ? "s" : ""}` as const;
};

export const time = (milliseconds: number) => {
  const absoluteMilliseconds = Math.abs(milliseconds);

  if (absoluteMilliseconds >= minute) {
    return plural(milliseconds, absoluteMilliseconds, "minute");
  }

  if (absoluteMilliseconds >= second) {
    return plural(milliseconds, absoluteMilliseconds, "second");
  }

  return `${milliseconds} ms` as const;
};
