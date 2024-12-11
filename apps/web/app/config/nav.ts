import type { FileRoutesByTo } from "@/routeTree.gen";

interface NavItem {
  icon: string;
  title: string;
  to: keyof FileRoutesByTo;
}

export const nav = {
  items: [
    { icon: "icon-[lucide--home]", title: "Home", to: "/" },
    { icon: "icon-[lucide--clapperboard]", title: "Movies", to: "/movies" },
    { icon: "icon-[lucide--tv]", title: "TV Shows", to: "/tv-shows" },
    { icon: "icon-[lucide--person-standing]", title: "People", to: "/people" },
    { icon: "icon-[lucide--trending-up]", title: "Trending", to: "/trending" },
  ] satisfies NavItem[],
};
