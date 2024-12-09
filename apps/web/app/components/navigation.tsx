import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { Link } from "@tanstack/react-router";

import { GitHubLink } from "./github-link";

export const Navigation = () => {
  return (
    <nav className="dsy-navbar static w-full lg:sticky lg:top-0 lg:z-30 lg:backdrop-blur">
      <div className="flex-1">
        <Link className="dsy-btn dsy-btn-ghost text-lg" href="/">
          <span className="font-bold">🍿 popcorn.fyi</span>
        </Link>
      </div>
      <div className="dsy-navbar-end">
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
              <span className="icon-[carbon--login] h-7 w-7" />
            </button>
          </SignInButton>
        </SignedOut>
      </div>
    </nav>
  );
};
