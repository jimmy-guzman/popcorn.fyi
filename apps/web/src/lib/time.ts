const ONE_SECOND_MS = 1000;
const SIXTY_SECONDS = 60;
const ONE_MINUTE_MS = ONE_SECOND_MS * SIXTY_SECONDS;
const PLURAL_THRESHOLD = 1.5;

const units = { minute: ONE_MINUTE_MS, second: ONE_SECOND_MS };

const plural = (
  milliseconds: number,
  absoluteMilliseconds: number,
  name: "minute" | "second",
) => {
  const unit = units[name];
  const isPlural = absoluteMilliseconds >= unit * PLURAL_THRESHOLD;

  return `${Math.round(milliseconds / unit)} ${name}${isPlural ? "s" : ""}` as const;
};

export const time = (milliseconds: number) => {
  const absoluteMilliseconds = Math.abs(milliseconds);

  if (absoluteMilliseconds >= ONE_MINUTE_MS) {
    return plural(milliseconds, absoluteMilliseconds, "minute");
  }

  if (absoluteMilliseconds >= ONE_SECOND_MS) {
    return plural(milliseconds, absoluteMilliseconds, "second");
  }

  return `${milliseconds} ms` as const;
};
