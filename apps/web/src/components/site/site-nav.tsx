import { Button } from "@popcorn.fyi/ui/button";
import { Link } from "@tanstack/react-router";

import { topNav } from "@/config/nav";
import { site } from "@/config/site";

import { SiteLogo } from "../icons/site-logo";
import { SiteNavMenuItem } from "./site-nav-menu-item";
import { SiteNavMobileMenu } from "./site-nav-mobile-menu";
import { SiteNavSearchInput } from "./site-nav-search-input";

export const SiteNav = () => {
  return (
    <nav className="dsy-navbar bg-base-100 sticky top-0 z-50 w-full">
      <div className="dsy-navbar-center">
        <Button asChild variant="ghost">
          <Link to="/">
            <SiteLogo classname="h-6 w-6" />
            <span className="ml-2 hidden font-bold xl:block">{site.title}</span>
          </Link>
        </Button>

        <ul className="dsy-menu dsy-menu-horizontal hidden gap-1 px-2 xl:flex">
          {topNav.map((item) => (
            <SiteNavMenuItem item={item} key={item.title} />
          ))}
        </ul>
      </div>

      <div className="dsy-navbar-end w-full">
        <SiteNavSearchInput />
        <SiteNavMobileMenu items={topNav} />
      </div>
    </nav>
  );
};
