import { Button } from "@popcorn.fyi/ui/button";
import { createFileRoute, Link, Outlet } from "@tanstack/react-router";

import { SiteLogo } from "@/components/icons/site-logo";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNav } from "@/components/site/site-nav";
import { SiteNavMenuItem } from "@/components/site/site-nav-menu-item";
import { SiteNavMenuItemLink } from "@/components/site/site-nav-menu-item-link";
import {
  categoryNav,
  exploreNav,
  favoritesNavItem,
  homeNavItem,
  watchlistNavItem,
} from "@/config/nav";
import { site } from "@/config/site";

/**
 * The main layout component for the application.
 * It includes the navigation drawer, site navigation, and footer.
 *
 * @returns The layout structure including navigation, content area, and footer.
 */
function LayoutComponent() {
  return (
    <div>
      <div className="dsy-drawer lg:dsy-drawer-open">
        <input className="dsy-drawer-toggle" id="my-drawer-2" type="checkbox" />
        <div className="dsy-drawer-content">
          <SiteNav />
          <main className="container mx-auto min-h-screen p-4 pb-16">
            <Outlet />
          </main>
        </div>
        <div className="dsy-drawer-side border-neutral z-40 border-r">
          <aside className="h-min-[100vh-68px]">
            <div className="p-4">
              <Button asChild modifier="wide" size="lg" variant="ghost">
                <Link to="/">
                  <SiteLogo classname="w-6 h-6" />
                  <span className="hidden font-bold lg:block">
                    {site.title}
                  </span>
                </Link>
              </Button>
            </div>
            <ul className="dsy-menu text-base-content w-60 px-4">
              <li>
                <SiteNavMenuItemLink item={homeNavItem} />
              </li>
              <SiteNavMenuItem item={favoritesNavItem} />
              <SiteNavMenuItem item={watchlistNavItem} />
              <div className="dsy-divider" />
              <h2 className="dsy-menu-title">Explore</h2>
              {exploreNav.items.map((item) => (
                <SiteNavMenuItem item={item} key={item.title} />
              ))}
              <div className="dsy-divider" />
              <h2 className="dsy-menu-title">Categories</h2>
              {categoryNav.items.map((item) => (
                <SiteNavMenuItem item={item} key={item.title} />
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

export const Route = createFileRoute("/_layout")({
  component: LayoutComponent,
});
