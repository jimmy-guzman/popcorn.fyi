import type { FileRoutesByTo } from "@/routeTree.gen";
/**
 * Represents a single navigation item with an icon, title, and route.
 */
export interface SingleNavItem {
  /** The icon associated with the navigation item */
  icon: string;
  /** The display title of the navigation item */
  title: string;
  /** The route path for the navigation item */
  to: keyof FileRoutesByTo;
}

/**
 * Represents a grouped navigation item that contains multiple sub-items.
 */
export interface GroupedNavItem {
  /** The icon representing the group of navigation items */
  icon: string;
  /** The array of sub-items under this grouped navigation item */
  items: SingleNavItem[];
  /** The display title of the grouped navigation item */
  title: string;
  /** The route path for the grouped navigation item */
  to: string;
}

/**
 * A navigation item that can be either a single item or a grouped item.
 */
export type NavItem = GroupedNavItem | SingleNavItem;

/**
 * Navigation configuration for category-based browsing (Movies, TV Shows, People).
 */
export const categoryNav = {
  items: [
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
        {
          icon: "icon-[lucide--star]",
          title: "Favorites",
          to: "/favorites/movies",
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
        {
          icon: "icon-[lucide--star]",
          title: "Favorites",
          to: "/favorites/tv-shows",
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
        {
          icon: "icon-[lucide--star]",
          title: "Favorites",
          to: "/favorites/people",
        },
      ],
      title: "People",
      to: "/people",
    },
  ] satisfies NavItem[],
};

/**
 * Navigation item for the homepage.
 */
export const homeNavItem = {
  icon: "icon-[lucide--home]",
  title: "Home",
  to: "/",
} satisfies NavItem;

/**
 * Navigation configuration for accessing user favorites.
 */
export const favoritesNavItem = {
  icon: "icon-[lucide--star]",
  items: [
    {
      icon: "icon-[lucide--clapperboard]",
      title: "Movies",
      to: "/favorites/movies",
    },
    { icon: "icon-[lucide--tv]", title: "TV Shows", to: "/favorites/tv-shows" },
    {
      icon: "icon-[lucide--person-standing]",
      title: "People",
      to: "/favorites/people",
    },
  ],
  title: "Favorites",
  to: "/favorites",
} satisfies NavItem;

/**
 * Navigation configuration for exploration-based browsing.
 */
export const exploreNav = {
  items: [
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
      icon: "icon-[lucide--thumbs-up]",
      items: [
        {
          icon: "icon-[lucide--clapperboard]",
          title: "Movies",
          to: "/movies/popular",
        },
        {
          icon: "icon-[lucide--tv]",
          title: "TV Shows",
          to: "/tv-shows/popular",
        },
        {
          icon: "icon-[lucide--person-standing]",
          title: "People",
          to: "/people/popular",
        },
      ],
      title: "Popular",
      to: "/popular",
    },
    {
      icon: "icon-[lucide--award]",
      items: [
        {
          icon: "icon-[lucide--clapperboard]",
          title: "Movies",
          to: "/movies/top-rated",
        },
        {
          icon: "icon-[lucide--tv]",
          title: "TV Shows",
          to: "/tv-shows/top-rated",
        },
      ],
      title: "Top Rated",
      to: "/top-rated",
    },
  ] satisfies NavItem[],
};
