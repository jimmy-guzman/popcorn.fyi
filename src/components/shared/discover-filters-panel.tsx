import type { ReactNode } from "react";

import { SlidersHorizontalIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DiscoverFiltersPanelProps {
  activeCount: number;
  children: ReactNode;
}

export const DiscoverFiltersPanel = ({
  activeCount,
  children,
}: DiscoverFiltersPanelProps) => {
  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <SlidersHorizontalIcon data-icon="inline-start" />
        Filters
        {activeCount > 0 ? (
          <Badge className="tabular-nums" variant="default">
            {activeCount}
          </Badge>
        ) : null}
      </PopoverTrigger>
      <PopoverContent
        align="start"
        className="max-h-[70svh] w-[min(calc(100vw-2rem),24rem)] overflow-y-auto"
      >
        <FieldGroup>{children}</FieldGroup>
      </PopoverContent>
    </Popover>
  );
};
