import { Button } from "@popcorn.fyi/ui/button";
import { Drawer } from "vaul";

import type { NavItem } from "@/config/nav";

import { Prose } from "../shared/prose";
import { SiteNavMenuItem } from "./site-nav-menu-item";

export function SiteNavMobileMenu({ items }: { items: NavItem[] }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <Button className="xl:hidden" size="sm" variant="ghost">
          <span className="sr-only">Open Navigation Menu</span>
          <span className="icon-[lucide--menu] h-5 w-5" />
        </Button>
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
          <ul className="dsy-menu w-full">
            {items.map((item) => (
              <SiteNavMenuItem item={item} key={item.title} />
            ))}
          </ul>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
