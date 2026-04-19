import { MenuIcon } from "lucide-react";

import type { NavItem } from "@/config/nav";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Prose } from "../shared/prose";
import { SiteNavMenuItem } from "./site-nav-menu-item";

export function SiteNavMobileMenu({ items }: { items: NavItem[] }) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="xl:hidden"
          size="icon-sm"
          type="button"
          variant="ghost"
        >
          <span className="sr-only">Open Navigation Menu</span>
          <MenuIcon aria-hidden className="size-5" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="items-stretch px-2 pb-4">
        <DrawerHeader>
          <Prose size="sm">
            <DrawerTitle className="text-center">Menu</DrawerTitle>
          </Prose>
          <DrawerDescription className="sr-only">Menu</DrawerDescription>
        </DrawerHeader>
        <ul className="flex w-full flex-col gap-1">
          {items.map((item) => {
            return <SiteNavMenuItem item={item} key={item.to} />;
          })}
        </ul>
      </DrawerContent>
    </Drawer>
  );
}
