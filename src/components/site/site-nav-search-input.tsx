import { useMatch, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_MS = 500;

export const SiteNavSearchInput = () => {
  const match = useMatch({ from: "/_layout/search", shouldThrow: false });
  const search = useSearch({ strict: false });
  const [query, setQuery] = useState(search.q ?? "");
  const [value] = useDebounce(query, DEBOUNCE_MS);
  const navigate = useNavigate();

  useEffect(() => {
    if (value !== "") {
      void navigate({ search: { q: value }, to: "/search" });
    }
  }, [value, navigate]);

  useEffect(() => {
    if (!match) {
      // eslint-disable-next-line @eslint-react/hooks-extra/no-direct-set-state-in-use-effect -- TODO
      setQuery("");
    }
  }, [match]);

  return (
    <div
      aria-label="Site search"
      className="w-full lg:w-1/2 xl:w-3/4"
      role="search"
    >
      <label
        aria-label="Search movies and TV shows"
        className="dsy-input w-full"
        htmlFor="site-search"
      >
        <span className="icon-[lucide--search] h-[1em] opacity-50" />
        <input
          id="site-search"
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          onKeyDown={async (event) => {
            if (event.key === "Enter") {
              await navigate({ search: { q: value }, to: "/search" });
            }
          }}
          placeholder="Search..."
          type="search"
          value={query}
        />
      </label>
    </div>
  );
};
