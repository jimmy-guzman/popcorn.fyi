import { Input } from "@popcorn.fyi/ui/input";
import { useMatch, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_MS = 500;

export const SiteNavSearchInput = () => {
  const match = useMatch({ from: "/_layout/search", shouldThrow: false });
  const search = useSearch({ strict: false });
  const [query, setQuery] = useState(search.q ?? "");
  const [value] = useDebounce(query, DEBOUNCE_MS);
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
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect -- TODO
      setQuery("");
    }
  }, [match]);

  return (
    <Input
      className="w-full xl:w-1/2"
      onChange={(event) => {
        setQuery(event.target.value);
      }}
      onKeyDown={async (event) => {
        if (event.key === "Enter") {
          await handleSearch(value);
        }
      }}
      placeholder="Search..."
      type="text"
      value={query}
    />
  );
};
