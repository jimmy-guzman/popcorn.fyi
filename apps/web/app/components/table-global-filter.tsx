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
        <button
          className="dsy-btn dsy-btn-neutral dsy-btn-sm"
          onClick={() => {
            resetGlobalFilter();
          }}
          type="button"
        >
          Reset <span className="icon-[lucide--list-restart]" />
        </button>
      ) : null}
    </div>
  );
};
