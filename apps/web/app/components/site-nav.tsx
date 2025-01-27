import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { Button } from "@popcorn.fyi/ui/button";
import { Link } from "@tanstack/react-router";

import { nav } from "@/config/nav";
import { site } from "@/config/site";

import { SiteLogo } from "./site-logo";
import { SiteNavMenuItem } from "./site-nav-menu-item";
import { SiteNavMobileMenu } from "./site-nav-mobile-menu";
import { SiteNavSearchInput } from "./site-nav-search-input";

export const SiteNav = () => {
  return (
    <nav className="dsy-navbar static w-full lg:sticky lg:top-0 lg:z-30 lg:backdrop-blur">
      <div className="dsy-navbar-start">
        <SiteNavMobileMenu items={nav.items} />
        <Button asChild variant="ghost">
          <Link to="/">
            <SiteLogo classname="w-6 h-6" />
            <span className="hidden font-bold xl:block">{site.title}</span>
          </Link>
        </Button>
      </div>
      <div className="dsy-navbar-center grow xl:hidden">
        <SiteNavSearchInput />
      </div>
      <div className="dsy-navbar-center hidden xl:flex">
        <ul className="dsy-menu dsy-menu-horizontal">
          {nav.items.map((item) => {
            return <SiteNavMenuItem item={item} key={item.title} />;
          })}
        </ul>
      </div>
      <div className="dsy-navbar-end hidden gap-2 xl:flex">
        <SiteNavSearchInput />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarImage: "rounded-full",
                userButtonTrigger:
                  "dsy-btn dsy-btn-ghost dsy-btn-circle dsy-avatar dsy-avatar-online",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <Button modifier="circle" variant="ghost">
              <span className="sr-only">Sign In</span>
              <span className="icon-[lucide--log-in] h-5 w-5" />
            </Button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};
