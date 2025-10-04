import { useMatch, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

const DEBOUNCE_MS = 500;

export const SiteNavSearchInput = () => {
  const match = useMatch({ from: "/_layout/search", shouldThrow: false });
  const search = useSearch({ strict: false });
  const navigate = useNavigate();

  const initialQuery = match ? (search.q ?? "") : "";
  const [query, setQuery] = useState(initialQuery);
  const [value] = useDebounce(query, DEBOUNCE_MS);

  useEffect(() => {
    if (value !== "") {
      void navigate({ search: { q: value }, to: "/search" });
    }
  }, [value, navigate]);

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
          defaultValue={initialQuery}
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
        />
      </label>
    </div>
  );
};
