import { ListRestartIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TableGlobalFilterProps {
  globalFilter: string;
  resetGlobalFilter: (defaultState?: boolean) => void;
  setGlobalFilter: (value: string) => void;
}

/** Toolbar row aligned with shadcn Data Table “Filtering” example. */
export const TableGlobalFilter = ({
  globalFilter,
  resetGlobalFilter,
  setGlobalFilter,
}: TableGlobalFilterProps) => {
  return (
    <div className="flex w-full flex-wrap items-center gap-2">
      <Input
        className="max-w-sm"
        onChange={(event) => {
          setGlobalFilter(event.target.value);
        }}
        placeholder="Search..."
        type="text"
        value={globalFilter}
      />
      {globalFilter ? (
        <Button
          onClick={() => {
            resetGlobalFilter();
          }}
          size="sm"
          type="button"
          variant="outline"
        >
          Reset <ListRestartIcon />
        </Button>
      ) : null}
    </div>
  );
};
