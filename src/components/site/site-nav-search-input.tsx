import { useMatch, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

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
      // eslint-disable-next-line react-hooks/set-state-in-effect -- TODO
      setQuery("");
    }
  }, [match]);

  return (
    <div
      aria-label="Site search"
      className="w-[min(100%,18rem)] shrink md:w-56 lg:w-64"
      role="search"
    >
      <Label className="sr-only" htmlFor="site-search">
        Search movies and TV shows
      </Label>
      <InputGroup className="w-full">
        <InputGroupInput
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
        <InputGroupAddon align="inline-start">
          <span
            aria-hidden
            className="icon-[lucide--search] size-4 text-muted-foreground"
          />
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};
