import {
  categoryNav,
  exploreNav,
  favoritesNavItem,
  homeNavItem,
  watchlistNavItem,
} from "./nav";

describe("Navigation Configuration", () => {
  const navConfigs = [
    ...categoryNav.items,
    ...exploreNav.items,
    homeNavItem,
    favoritesNavItem,
    watchlistNavItem,
  ];

  it("should have valid routes for all navigation items", () => {
    for (const item of navConfigs) {
      expect(typeof item.to).toBe("string");
      expect(item.to.startsWith("/")).toBe(true);

      if ("items" in item) {
        for (const subItem of item.items) {
          expect(typeof subItem.to).toBe("string");
          expect(subItem.to.startsWith("/")).toBe(true);
        }
      }
    }
  });

  it("should have proper structure for navigation items", () => {
    for (const item of navConfigs) {
      expect(typeof item.icon).toBe("string");
      expect(typeof item.title).toBe("string");
      expect(typeof item.to).toBe("string");

      if ("items" in item) {
        expect(Array.isArray(item.items)).toBe(true);
        for (const subItem of item.items) {
          expect(typeof subItem.icon).toBe("string");
          expect(typeof subItem.title).toBe("string");
          expect(typeof subItem.to).toBe("string");
        }
      }
    }
  });
});
