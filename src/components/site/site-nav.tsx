import { Link } from "@tanstack/react-router";
import { PopcornIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { topNav } from "@/config/nav";
import { site } from "@/config/site";

import { SiteNavDesktop } from "./site-nav-desktop";
import { SiteNavMobileMenu } from "./site-nav-mobile-menu";
import { SiteNavSearchInput } from "./site-nav-search-input";

export const SiteNav = () => {
  return (
    <nav className="sticky top-0 z-50 flex w-full min-w-0 flex-nowrap items-center justify-between gap-3 border-b border-border bg-background px-3 py-2">
      <div className="flex min-w-0 flex-1 items-center gap-2">
        <Button
          nativeButton={false}
          render={<Link aria-label={site.title} to="/" />}
          size="icon"
          variant="ghost"
        >
          <PopcornIcon className="size-5 shrink-0" />
        </Button>
        <div className="min-w-0 flex-1">
          <SiteNavDesktop items={topNav} />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <SiteNavSearchInput />
        <SiteNavMobileMenu items={topNav} />
      </div>
    </nav>
  );
};
