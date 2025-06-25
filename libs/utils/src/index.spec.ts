import { currency, date, time, year } from "./index";

test("should export", () => {
  expect(currency).toBeDefined();
  expect(date).toBeDefined();
  expect(time).toBeDefined();
  expect(year).toBeDefined();
});
