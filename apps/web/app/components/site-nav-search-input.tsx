import { useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const SiteNavSearchInput = () => {
  const search = useSearch({ strict: false });
  const [term, setTerm] = useState(search.q ?? "");
  const [value] = useDebounce(term, 500);
  const navigate = useNavigate();

  const handleSearch = useCallback(
    async (value: string) => {
      await navigate({ search: { q: value }, to: "/search" });
    },
    [navigate],
  );

  useEffect(() => {
    if (value !== "") {
      void handleSearch(value);
    }
  }, [value, handleSearch]);

  return (
    <label className="dsy-input flex items-center gap-2">
      <span className="sr-only">Search</span>
      <input
        className="grow"
        onChange={(event) => {
          setTerm(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await handleSearch(value);
          }
        }}
        placeholder="Search"
        type="text"
        value={term}
      />
      <span className="icon-[lucide--search] h-4 w-4" />
    </label>
  );
};
