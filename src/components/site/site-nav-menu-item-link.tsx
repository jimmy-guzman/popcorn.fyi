import { Link } from "@tanstack/react-router";

import type { SingleNavItem } from "@/config/nav";

import { Button } from "@/components/ui/button";

export const SiteNavMenuItemLink = ({ item }: { item: SingleNavItem }) => {
  const Icon = item.icon;

  return (
    <Button
      className="h-auto min-w-0 justify-start text-nowrap"
      nativeButton={false}
      render={
        <Link
          activeProps={{
            className: "bg-accent text-accent-foreground",
          }}
          to={item.to}
        />
      }
      size="default"
      variant="ghost"
    >
      <Icon aria-hidden className="size-5 shrink-0" /> {item.title}
    </Button>
  );
};
