import { useLocation } from "@tanstack/react-router";
import { useRef } from "react";

import type { GroupedNavItem, NavItem } from "@/config/nav";

import { cn } from "@/lib/cn";

import { SiteNavMenuItemLink } from "./site-nav-menu-item-link";

const SiteNavCollapsibleMenuItem = ({ item }: { item: GroupedNavItem }) => {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDetailsElement>(null);

  const isActive = pathname.startsWith(item.to);

  return (
    <details
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) {
          e.currentTarget.removeAttribute("open");
        }
      }}
      ref={ref}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- safari does not work correctly w/ document.activeElement
      tabIndex={0}
    >
      <summary
        className={cn(isActive && "bg-(--dsy-menu-active-bg)")}
        role="button"
      >
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
