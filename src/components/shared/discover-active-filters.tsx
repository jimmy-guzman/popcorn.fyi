import { XIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export interface ActiveFilter {
  key: string;
  label: string;
  onClear: () => void;
  value: string;
}

interface DiscoverActiveFiltersProps {
  filters: ActiveFilter[];
  onClearAll: () => void;
}

export const DiscoverActiveFilters = ({
  filters,
  onClearAll,
}: DiscoverActiveFiltersProps) => {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {filters.map((filter) => {
        return (
          <Badge className="gap-1 pr-1" key={filter.key} variant="secondary">
            <span className="text-muted-foreground">{filter.label}:</span>
            {filter.value}
            <Button
              aria-label={`Clear ${filter.label}`}
              onClick={filter.onClear}
              size="icon-sm"
              variant="ghost"
            >
              <XIcon />
            </Button>
          </Badge>
        );
      })}
      <Button onClick={onClearAll} size="sm" variant="ghost">
        Clear all
      </Button>
    </div>
  );
};
