import type { FileRoutesByTo } from "@/routeTree.gen";

export interface SingleNavItem {
  icon: string;
  title: string;
  to: keyof FileRoutesByTo;
}

interface MultipleNavItem {
  icon: string;
  items: SingleNavItem[];
  title: string;
  to: string;
}

export type NavItem = MultipleNavItem | SingleNavItem;

export const nav = {
  items: [
    {
      icon: "icon-[lucide--home]",
      title: "Home",
      to: "/",
    },
    {
      icon: "icon-[lucide--clapperboard]",
      items: [
        {
          icon: "icon-[lucide--heart]",
          title: "Popular",
          to: "/movies/popular",
        },
        {
          icon: "icon-[lucide--star]",
          title: "Top Rated",
          to: "/movies/top-rated",
        },
      ],
      title: "Movies",
      to: "/movies",
    },
    {
      icon: "icon-[lucide--tv]",
      items: [
        {
          icon: "icon-[lucide--heart]",
          title: "Popular",
          to: "/tv-shows/popular",
        },
        {
          icon: "icon-[lucide--star]",
          title: "Top Rated",
          to: "/tv-shows/top-rated",
        },
      ],
      title: "TV Shows",
      to: "/tv-shows",
    },
    {
      icon: "icon-[lucide--person-standing]",
      title: "People",
      to: "/people",
    },
    {
      icon: "icon-[lucide--trending-up]",
      title: "Trending",
      to: "/trending",
    },
  ] satisfies NavItem[],
};
