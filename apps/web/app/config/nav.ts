import type { FileRoutesByTo } from "@/routeTree.gen";

export interface SingleNavItem {
  icon: string;
  title: string;
  to: keyof FileRoutesByTo;
}

export interface MultipleNavItem {
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
        {
          icon: "icon-[lucide--telescope]",
          title: "Discover",
          to: "/movies/discover",
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
        {
          icon: "icon-[lucide--telescope]",
          title: "Discover",
          to: "/tv-shows/discover",
        },
      ],
      title: "TV Shows",
      to: "/tv-shows",
    },
    {
      icon: "icon-[lucide--person-standing]",
      items: [
        {
          icon: "icon-[lucide--heart]",
          title: "Popular",
          to: "/people/popular",
        },
      ],
      title: "People",
      to: "/people",
    },
    {
      icon: "icon-[lucide--trending-up]",
      items: [
        {
          icon: "icon-[lucide--clapperboard]",
          title: "Movies",
          to: "/trending/movies",
        },
        {
          icon: "icon-[lucide--tv]",
          title: "TV Shows",
          to: "/trending/tv-shows",
        },
        {
          icon: "icon-[lucide--person-standing]",
          title: "People",
          to: "/trending/people",
        },
      ],
      title: "Trending",
      to: "/trending",
    },
    {
      icon: "icon-[lucide--star]",
      items: [
        {
          icon: "icon-[lucide--clapperboard]",
          title: "Movies",
          to: "/favorites/movies",
        },
        {
          icon: "icon-[lucide--tv]",
          title: "TV Shows",
          to: "/favorites/tv-shows",
        },
        {
          icon: "icon-[lucide--person-standing]",
          title: "People",
          to: "/favorites/people",
        },
      ],
      title: "Favorites",
      to: "/favorites",
    },
  ] satisfies NavItem[],
};
