import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { Drawer } from "vaul";

import type { NavItem } from "@/config/nav";

import { Prose } from "./prose";
import { SiteNavMenuItem } from "./site-nav-menu-item";

export function SiteNavMobileMenu({ items }: { items: NavItem[] }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger className="dsy-btn dsy-btn-ghost dsy-btn-sm lg:hidden">
        <span className="icon-[lucide--menu] h-5 w-5" />
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="bg-base-100/40 fixed inset-0" />
        <Drawer.Content className="bg-base-100 fixed bottom-0 left-0 right-0 mt-3 flex h-fit flex-col items-center p-2">
          <Drawer.Title className="text-center">
            <Prose size="sm">
              <h2>Menu</h2>
            </Prose>
          </Drawer.Title>
          <Drawer.Description>
            <span className="sr-only">Menu</span>
          </Drawer.Description>
          <ul className="dsy-menu dsy-menu-sm w-full">
            {items.map((item) => {
              return <SiteNavMenuItem item={item} key={item.title} />;
            })}
            <li className="flex flex-row items-center justify-center">
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
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
