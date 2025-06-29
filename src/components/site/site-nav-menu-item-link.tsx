import { Link } from "@tanstack/react-router";

import type { SingleNavItem } from "@/config/nav";

import { cn } from "@/lib/cn";

export const SiteNavMenuItemLink = ({ item }: { item: SingleNavItem }) => {
  return (
    <Link
      activeProps={{
        className: "dsy-menu-active",
      }}
      className="text-nowrap"
      to={item.to}
    >
      <span className={cn(item.icon, "h-5 w-5")} /> {item.title}
    </Link>
  );
};
