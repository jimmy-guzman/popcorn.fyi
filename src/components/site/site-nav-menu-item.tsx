import { useLocation } from "@tanstack/react-router";
import { ChevronDownIcon } from "lucide-react";

import type { GroupedNavItem, NavItem } from "@/config/nav";

import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { cn } from "@/lib/cn";

import { SiteNavMenuItemLink } from "./site-nav-menu-item-link";

const SiteNavCollapsibleMenuItem = ({ item }: { item: GroupedNavItem }) => {
  const { pathname } = useLocation();
  const isActive = pathname.startsWith(item.to);
  const Icon = item.icon;

  return (
    <Collapsible className="w-full">
      <CollapsibleTrigger
        className="group w-full"
        render={
          <Button
            className={cn(
              "w-full justify-between gap-2 font-normal",
              isActive && "bg-accent text-accent-foreground",
            )}
            variant="ghost"
          />
        }
      >
        <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
          <Icon aria-hidden className="size-5 shrink-0" />
          {item.title}
        </span>
        <ChevronDownIcon
          aria-hidden
          className="size-4 shrink-0 transition-transform group-data-panel-open:rotate-180"
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <ul className="flex flex-col gap-0.5 pt-1 pl-2">
          {item.items.map((sub) => {
            return (
              <li key={sub.title}>
                <SiteNavMenuItemLink item={sub} />
              </li>
            );
          })}
        </ul>
      </CollapsibleContent>
    </Collapsible>
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
