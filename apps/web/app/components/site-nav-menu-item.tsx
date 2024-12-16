import { useLocation } from "@tanstack/react-router";
import { useRef } from "react";

import type { MultipleNavItem, NavItem } from "@/config/nav";

import { cn } from "@/lib/cn";

import { SiteNavMenuItemLink } from "./site-nav-menu-item-link";

const SiteNavCollapsibleMenuItem = ({ item }: { item: MultipleNavItem }) => {
  const { pathname } = useLocation();
  const ref = useRef<HTMLDetailsElement>(null);

  const handleBlur = (e: React.FocusEvent<HTMLDetailsElement>) => {
    const currentTarget = e.currentTarget;

    requestAnimationFrame(() => {
      if (!currentTarget.contains(document.activeElement) && ref.current) {
        ref.current.open = false;
      }
    });
  };
  const isActive = pathname.startsWith(item.to);

  return (
    <details onBlur={handleBlur} ref={ref}>
      <summary className={cn(isActive && "dsy-btn-active")}>
        <span className={cn(item.icon, "h-5 w-5")} /> {item.title}
      </summary>
      <ul className="bg-base-100 rounded-t-none">
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
