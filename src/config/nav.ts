import type {LucideIcon} from "lucide-react";

import {
  AwardIcon,
  ClapperboardIcon,
  FlameIcon,
  
  PersonStandingIcon,
  TelescopeIcon,
  ThumbsUpIcon,
  TvIcon
} from "lucide-react";

import type { FileRoutesByTo } from "@/routeTree.gen";

/**
 * Represents a single navigation item with an icon, title, and route.
 */
export interface SingleNavItem {
  icon: LucideIcon;
  title: string;
  to: keyof FileRoutesByTo;
}

/**
 * Represents a grouped navigation item that contains multiple sub-items.
 */
export interface GroupedNavItem {
  icon: LucideIcon;
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
    icon: TelescopeIcon,
    items: [
      {
        icon: ClapperboardIcon,
        title: "Movies",
        to: "/movies/discover",
      },
      {
        icon: TvIcon,
        title: "TV Shows",
        to: "/tv-shows/discover",
      },
    ],
    title: "Discover",
    to: "/discover",
  },
  {
    icon: FlameIcon,
    items: [
      {
        icon: ClapperboardIcon,
        title: "Movies",
        to: "/trending/movies",
      },
      {
        icon: TvIcon,
        title: "TV Shows",
        to: "/trending/tv-shows",
      },
      {
        icon: PersonStandingIcon,
        title: "People",
        to: "/trending/people",
      },
    ],
    title: "Trending",
    to: "/trending",
  },
  {
    icon: ClapperboardIcon,
    items: [
      {
        icon: TelescopeIcon,
        title: "Discover",
        to: "/movies/discover",
      },
      {
        icon: FlameIcon,
        title: "Trending",
        to: "/trending/movies",
      },
      {
        icon: ThumbsUpIcon,
        title: "Popular",
        to: "/movies/popular",
      },
      {
        icon: AwardIcon,
        title: "Top Rated",
        to: "/movies/top-rated",
      },
    ],
    title: "Movies",
    to: "/movies",
  },
  {
    icon: TvIcon,
    items: [
      {
        icon: TelescopeIcon,
        title: "Discover",
        to: "/tv-shows/discover",
      },
      {
        icon: FlameIcon,
        title: "Trending",
        to: "/trending/tv-shows",
      },
      {
        icon: ThumbsUpIcon,
        title: "Popular",
        to: "/tv-shows/popular",
      },
      {
        icon: AwardIcon,
        title: "Top Rated",
        to: "/tv-shows/top-rated",
      },
    ],
    title: "TV Shows",
    to: "/tv-shows",
  },
  {
    icon: PersonStandingIcon,
    items: [
      {
        icon: FlameIcon,
        title: "Trending",
        to: "/trending/people",
      },
      {
        icon: ThumbsUpIcon,
        title: "Popular",
        to: "/people/popular",
      },
    ],
    title: "People",
    to: "/people",
  },
] satisfies NavItem[];
