import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { Link } from "@tanstack/react-router";

import { nav } from "@/config/nav";
import { site } from "@/config/site";

import { GitHubLink } from "./github-link";
import { SiteNavMenuItem } from "./site-nav-menu-item";
import { SiteNavMobileMenu } from "./site-nav-mobile-menu";
import { SiteNavSearchInput } from "./site-nav-search-input";

export const SiteNav = () => {
  return (
    <nav className="dsy-navbar static w-full lg:sticky lg:top-0 lg:z-30 lg:backdrop-blur">
      <div className="dsy-navbar-start">
        <SiteNavMobileMenu items={nav.items} />
        <Link
          className="dsy-btn dsy-btn-ghost dsy-btn-circle lg:dsy-btn-square text-lg"
          to="/"
        >
          <span>🍿</span>{" "}
          <span className="hidden font-bold lg:block">{site.title}</span>
        </Link>
        <div className="lg:hidden">
          <SiteNavSearchInput />
        </div>
      </div>
      <div className="dsy-navbar-center hidden lg:flex">
        <ul className="dsy-menu dsy-menu-horizontal gap-2">
          {nav.items.map((item) => {
            return <SiteNavMenuItem item={item} key={item.title} />;
          })}
        </ul>
      </div>
      <div className="dsy-navbar-end hidden lg:flex">
        <SiteNavSearchInput />
        <GitHubLink />
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarImage: "rounded-full",
                userButtonTrigger:
                  "dsy-btn dsy-btn-ghost dsy-btn-circle dsy-avatar",
              },
            }}
          />
        </SignedIn>
        <SignedOut>
          <SignInButton>
            <button
              className="dsy-btn dsy-btn-circle dsy-btn-ghost"
              type="button"
            >
              <span className="sr-only">Sign In</span>
              <span className="icon-[lucide--log-in] h-7 w-7" />
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};
