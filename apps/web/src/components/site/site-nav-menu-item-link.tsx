import { cn } from "@popcorn.fyi/ui/utils";
import { Link } from "@tanstack/react-router";

import type { SingleNavItem } from "@/config/nav";

export const SiteNavMenuItemLink = ({ item }: { item: SingleNavItem }) => {
  return (
    <Link
      activeProps={{
        // TODO: remove bg-base-300 when daisyUI v5 fixes active menu item
        className: "dsy-menu-active bg-base-300",
      }}
      className="text-nowrap"
      to={item.to}
    >
      <span className={cn(item.icon, "h-5 w-5")} /> {item.title}
    </Link>
  );
};
