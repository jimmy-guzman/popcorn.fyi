import { currency, date, limit, shuffle, time, year } from "./index";

test("should export", () => {
  expect(currency).toBeDefined();
  expect(date).toBeDefined();
  expect(time).toBeDefined();
  expect(year).toBeDefined();
  expect(shuffle).toBeDefined();
  expect(limit).toBeDefined();
});
