import { useLocation } from "@tanstack/react-router";

import type { NavItem } from "@/config/nav";

import { cn } from "@/lib/cn";

import { SiteNavMenuItemLink } from "./site-nav-menu-item-link";

export const SiteNavMenuItem = ({ item }: { item: NavItem }) => {
  const { pathname } = useLocation();

  if ("items" in item) {
    const isActive = pathname.startsWith(item.to);

    return (
      <li>
        <details>
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
      </li>
    );
  }

  return (
    <li>
      <SiteNavMenuItemLink item={item} />
    </li>
  );
};
