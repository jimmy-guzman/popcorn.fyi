import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";

import type { NavItem } from "@/config/nav";

import { GitHubLink } from "./github-link";
import { SiteNavMenuItem } from "./site-nav-menu-item";

export const SiteNavMobileMenu = ({ items }: { items: NavItem[] }) => {
  return (
    <div className="dsy-dropdown">
      <div
        className="dsy-btn dsy-btn-ghost lg:hidden"
        role="button"
        tabIndex={0}
      >
        <span className="icon-[lucide--menu] h-5 w-5" />
      </div>
      <ul
        className="dsy-menu dsy-menu-sm dsy-dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex -- daisyUI
        tabIndex={0}
      >
        {items.map((item) => {
          return <SiteNavMenuItem item={item} key={item.title} />;
        })}
        <li className="flex flex-row items-center justify-center">
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
        </li>
      </ul>
    </div>
  );
};
