import { useMatch, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const SiteNavSearchInput = () => {
  const match = useMatch({ from: "/_layout/search", shouldThrow: false });
  const search = useSearch({ strict: false });
  const [query, setQuery] = useState(search.q ?? "");
  const [value] = useDebounce(query, 500);
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

  useEffect(() => {
    if (!match) {
      setQuery("");
    }
  }, [match]);

  return (
    <label className="dsy-input flex w-full items-center gap-2">
      <span className="sr-only">Search</span>
      <input
        className="grow"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        onKeyDown={async (event) => {
          if (event.key === "Enter") {
            await handleSearch(value);
          }
        }}
        placeholder="Search"
        type="text"
        value={query}
      />
      <span className="icon-[lucide--search] h-4 w-4 md:h-5 md:w-5" />
    </label>
  );
};
