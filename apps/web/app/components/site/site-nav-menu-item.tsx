import { cn } from "@popcorn.fyi/ui/utils";
import { useLocation } from "@tanstack/react-router";

import type { GroupedNavItem, NavItem } from "@/config/nav";

import { SiteNavMenuItemLink } from "./site-nav-menu-item-link";

const SiteNavCollapsibleMenuItem = ({ item }: { item: GroupedNavItem }) => {
  const { pathname } = useLocation();

  const isActive = pathname === item.to;

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- safari does not work correctly w/ document.activeElement
    <details tabIndex={0}>
      {/* TODO: remove bg-base-300 when daisyUI v5 allows active dropdown */}
      <summary className={cn(isActive && "bg-base-300")} role="button">
        <span className={cn(item.icon, "h-5 w-5")} /> {item.title}
      </summary>
      <ul>
        {item.items.map((item) => {
          return (
            <li key={item.title}>
              <SiteNavMenuItemLink item={item} />
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export const SiteNavMenuItem = ({ item }: { item: NavItem }) => {
  if ("items" in item) {
    return (
      <li>
        <SiteNavCollapsibleMenuItem item={item} />
      </li>
    );
  }

  return (
    <li>
      <SiteNavMenuItemLink item={item} />
    </li>
  );
};
