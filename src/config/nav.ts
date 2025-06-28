import type { FileRoutesByTo } from "@/routeTree.gen";

/**
 * Represents a single navigation item with an icon, title, and route.
 */
export interface SingleNavItem {
  icon: string;
  title: string;
  to: keyof FileRoutesByTo;
}

/**
 * Represents a grouped navigation item that contains multiple sub-items.
 */
export interface GroupedNavItem {
  icon: string;
  items: SingleNavItem[];
  title: string;
  to: string;
}

/**
 * A navigation item that can be either a single item or a grouped item.
 */
export type NavItem = GroupedNavItem | SingleNavItem;

export const topNav = [
  {
    icon: "icon-[lucide--home]",
    title: "Home",
    to: "/",
  },
  {
    icon: "icon-[lucide--telescope]",
    items: [
      {
        icon: "icon-[lucide--clapperboard]",
        title: "Movies",
        to: "/movies/discover",
      },
      {
        icon: "icon-[lucide--tv]",
        title: "TV Shows",
        to: "/tv-shows/discover",
      },
    ],
    title: "Discover",
    to: "/discover",
  },
  {
    icon: "icon-[lucide--flame]",
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
    icon: "icon-[lucide--clapperboard]",
    items: [
      {
        icon: "icon-[lucide--telescope]",
        title: "Discover",
        to: "/movies/discover",
      },
      {
        icon: "icon-[lucide--flame]",
        title: "Trending",
        to: "/trending/movies",
      },
      {
        icon: "icon-[lucide--thumbs-up]",
        title: "Popular",
        to: "/movies/popular",
      },
      {
        icon: "icon-[lucide--award]",
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
        icon: "icon-[lucide--telescope]",
        title: "Discover",
        to: "/tv-shows/discover",
      },
      {
        icon: "icon-[lucide--flame]",
        title: "Trending",
        to: "/trending/tv-shows",
      },
      {
        icon: "icon-[lucide--thumbs-up]",
        title: "Popular",
        to: "/tv-shows/popular",
      },
      {
        icon: "icon-[lucide--award]",
        title: "Top Rated",
        to: "/tv-shows/top-rated",
      },
    ],
    title: "TV Shows",
    to: "/tv-shows",
  },
  {
    icon: "icon-[lucide--person-standing]",
    items: [
      {
        icon: "icon-[lucide--flame]",
        title: "Trending",
        to: "/trending/people",
      },
      {
        icon: "icon-[lucide--thumbs-up]",
        title: "Popular",
        to: "/people/popular",
      },
    ],
    title: "People",
    to: "/people",
  },
] satisfies NavItem[];
