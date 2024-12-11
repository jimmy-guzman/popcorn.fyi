import type { FileRoutesByTo } from "@/routeTree.gen";

interface NavItem {
  icon: string;
  title: string;
  to: keyof FileRoutesByTo;
}

export const nav = {
  items: [
    { icon: "home", title: "Home", to: "/" },
    { icon: "clapperboard", title: "Movies", to: "/movies" },
    { icon: "tv", title: "TV Shows", to: "/tv-shows" },
    { icon: "person-standing", title: "People", to: "/people" },
    { icon: "trending-up", title: "Trending", to: "/trending" },
  ] satisfies NavItem[],
};
