import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
      <Input
        className="grow"
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
          Reset <span className="icon-[lucide--list-restart]" />
        </Button>
      ) : null}
    </div>
  );
};
