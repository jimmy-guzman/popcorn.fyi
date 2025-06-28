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
      <input
        className="dsy-input grow"
        onChange={(event) => {
          setGlobalFilter(event.target.value);
        }}
        placeholder="Search..."
        type="text"
        value={globalFilter}
      />
      {globalFilter ? (
        <button
          className="dsy-btn-sm dsy-btn dsy-btn-neutral"
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
