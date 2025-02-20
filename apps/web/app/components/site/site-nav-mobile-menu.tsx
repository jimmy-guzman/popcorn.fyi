import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/tanstack-start";
import { Button } from "@popcorn.fyi/ui/button";
import { Drawer } from "vaul";

import type { NavItem } from "@/config/nav";

import { Prose } from "../shared/prose";
import { SiteNavMenuItem } from "./site-nav-menu-item";

export function SiteNavMobileMenu({ items }: { items: NavItem[] }) {
  return (
    <Drawer.Root>
      <Button asChild className="lg:hidden" size="sm" variant="ghost">
        <Drawer.Trigger>
          <span className="icon-[lucide--menu] h-5 w-5" />
        </Drawer.Trigger>
      </Button>
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
          <ul className="dsy-menu w-full">
            {items.map((item) => (
              <SiteNavMenuItem item={item} key={item.title} />
            ))}
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
                  <Button modifier="circle" variant="ghost">
                    <span className="sr-only">Sign In</span>
                    <span className="icon-[lucide--log-in] h-7 w-7" />
                  </Button>
                </SignInButton>
              </SignedOut>
            </li>
          </ul>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
