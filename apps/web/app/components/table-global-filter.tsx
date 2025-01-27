import { Button } from "@popcorn.fyi/ui/button";

interface TableGlobalFilterProps {
  globalFilter: string;
  resetGlobalFilter: (defaultState?: boolean) => void;
  setGlobalFilter: (value: string) => void;
}

export const TableGlobalFilter = ({
  globalFilter,
  resetGlobalFilter,
  setGlobalFilter,
}: TableGlobalFilterProps) => {
  return (
    <div className="col-span-2 flex w-full items-center gap-2">
      <label className="dsy-input flex w-full items-center">
        <span className="sr-only">Search</span>
        <input
          className="w-full"
          onChange={(event) => {
            setGlobalFilter(String(event.target.value));
          }}
          placeholder="Search..."
          type="text"
          value={globalFilter}
        />
        <span className="icon-[lucide--search]" />
      </label>
      {globalFilter ? (
        <Button
          color="neutral"
          onClick={() => {
            resetGlobalFilter();
          }}
          size="sm"
        >
          Reset <span className="icon-[lucide--list-restart]" />
        </Button>
      ) : null}
    </div>
  );
};
