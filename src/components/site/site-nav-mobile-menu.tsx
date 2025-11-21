import { Drawer } from "vaul";

import type { NavItem } from "@/config/nav";

import { Prose } from "../shared/prose";
import { SiteNavMenuItem } from "./site-nav-menu-item";

export function SiteNavMobileMenu({ items }: { items: NavItem[] }) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <button
          className="dsy-btn dsy-btn-ghost dsy-btn-sm xl:hidden"
          type="button"
        >
          <span className="sr-only">Open Navigation Menu</span>
          <span className="icon-[lucide--menu] h-5 w-5" />
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-base-100/40" />
        <Drawer.Content className="fixed right-0 bottom-0 left-0 mt-3 flex h-fit flex-col items-center bg-base-100 p-2">
          <Drawer.Title className="text-center">
            <Prose size="sm">
              <h2>Menu</h2>
            </Prose>
          </Drawer.Title>
          <Drawer.Description>
            <span className="sr-only">Menu</span>
          </Drawer.Description>
          <ul className="dsy-menu w-full">
            {items.map((item) => {
              return <SiteNavMenuItem item={item} key={item.title} />;
            })}
          </ul>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
