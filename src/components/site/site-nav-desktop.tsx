import { Link, useLocation } from "@tanstack/react-router";

import type { GroupedNavItem, NavItem, SingleNavItem } from "@/config/nav";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/cn";
import { isNavSectionActive } from "@/lib/is-nav-section-active";

function NavTopLevelLink({ item }: { item: SingleNavItem }) {
  const Icon = item.icon;

  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={navigationMenuTriggerStyle()}
        render={
          <Link
            activeOptions={item.to === "/" ? { exact: true } : undefined}
            activeProps={{
              className: "bg-accent text-accent-foreground",
            }}
            to={item.to}
          />
        }
      >
        <Icon aria-hidden className="size-5 shrink-0" />
        {item.to === "/" ? (
          <span className="sr-only">{item.title}</span>
        ) : (
          <span className="text-nowrap">{item.title}</span>
        )}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function NavGroupedItem({ item }: { item: GroupedNavItem }) {
  const { pathname } = useLocation();
  const isSectionActive = isNavSectionActive(pathname, item.to);
  const Icon = item.icon;

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        className={cn(
          isSectionActive && "bg-accent text-accent-foreground",
          "items-center gap-2",
        )}
      >
        <Icon aria-hidden className="size-5 shrink-0" />
        {item.title}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="flex min-w-48 flex-col gap-0.5 p-1">
          {item.items.map((sub) => {
            const SubIcon = sub.icon;

            return (
              <li key={sub.to}>
                <NavigationMenuLink
                  render={
                    <Link
                      activeProps={{
                        className: cn(
                          "bg-muted font-medium text-foreground",
                          "hover:bg-muted focus:bg-muted",
                        ),
                      }}
                      to={sub.to}
                    />
                  }
                >
                  <SubIcon aria-hidden className="size-4" />
                  <span className="text-nowrap">{sub.title}</span>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

function NavEntry({ item }: { item: NavItem }) {
  if ("items" in item) {
    return <NavGroupedItem item={item} />;
  }

  return <NavTopLevelLink item={item} />;
}

export const SiteNavDesktop = ({ items }: { items: NavItem[] }) => {
  return (
    <NavigationMenu className="hidden max-w-none min-w-0 flex-1 justify-start xl:flex">
      <NavigationMenuList className="flex-nowrap justify-start gap-2 overflow-x-auto [scrollbar-width:thin]">
        {items.map((item) => {
          return <NavEntry item={item} key={item.to} />;
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
