import { Button } from "@popcorn.fyi/ui/button";
import { Link } from "@tanstack/react-router";

import { categoryNav, homeNavItem } from "@/config/nav";

import { SiteLogo } from "../icons/site-logo";
import { SiteNavMobileMenu } from "./site-nav-mobile-menu";
import { SiteNavSearchInput } from "./site-nav-search-input";

export const SiteNav = () => {
  return (
    <nav className="dsy-navbar bg-base-100 static w-full lg:sticky lg:top-0 lg:z-50">
      <div className="dsy-navbar-start">
        <SiteNavMobileMenu items={[homeNavItem, ...categoryNav.items]} />
        <div className="md:hidden">
          <Button asChild variant="ghost">
            <Link to="/">
              <SiteLogo classname="w-6 h-6" />
            </Link>
          </Button>
        </div>
      </div>
      <div className="dsy-navbar-center grow xl:hidden">
        <SiteNavSearchInput />
      </div>
      <div className="dsy-navbar-center hidden xl:flex" />
      <div className="dsy-navbar-end hidden gap-2 xl:flex">
        <SiteNavSearchInput />
      </div>
    </nav>
  );
};
