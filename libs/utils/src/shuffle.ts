import { random } from "./random";

export const shuffle = <T>(array: T[]) => {
  if (array.length <= 1) return array;

  const copy = [...array];

  for (let index = 0; index < copy.length; index++) {
    const randomChoiceIndex = random(index, copy.length - 1);
    const a = copy[randomChoiceIndex];
    const b = copy[index];

    if (a && b) {
      [copy[index], copy[randomChoiceIndex]] = [a, b];
    }
  }

  return copy;
};
