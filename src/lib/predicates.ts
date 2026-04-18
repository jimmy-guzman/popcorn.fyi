export const hasKey = <K extends string>(key: K) => {
  return <T extends Partial<Record<K, unknown>>>(
    item: T,
  ): item is Record<K, number> & T => typeof item[key] === "number";
};

export const hasId = hasKey("id");
