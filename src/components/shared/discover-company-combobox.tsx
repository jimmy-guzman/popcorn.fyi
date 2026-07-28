import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { companyOptions } from "@/data/company";
import { searchCompaniesOptions } from "@/data/company.search";
import { orEmpty } from "@/lib/array";

const SEARCH_DEBOUNCE_MS = 300;

const DiscoverCompanyComboboxItems = ({
  labels,
}: {
  labels: ReadonlyMap<string, string>;
}) => {
  const filtered = ComboboxPrimitive.useFilteredItems<string>();

  return (
    <>
      {filtered.map((value) => {
        return (
          <ComboboxItem key={value} value={value}>
            {labels.get(value) ?? value}
          </ComboboxItem>
        );
      })}
    </>
  );
};

/**
 * Resolves a company id to its name. The query stays disabled while `id` is
 * `null`, so the empty-string key it builds is never fetched.
 */
const useCompanyName = (id: null | string) => {
  const { data } = useQuery({
    ...companyOptions(id ?? ""),
    enabled: id !== null,
  });

  return data?.name;
};

interface DiscoverCompanyComboboxProps {
  id: string;
  onChange: (value: null | string) => void;
  value: null | string;
}

/**
 * TMDB has no company list endpoint, so results come from `searchCompany` as
 * the user types. Base UI's client-side filtering is disabled with `filter=
 * {null}` to avoid re-filtering what the server already matched.
 */
export const DiscoverCompanyCombobox = ({
  id,
  onChange,
  value,
}: DiscoverCompanyComboboxProps) => {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, SEARCH_DEBOUNCE_MS);
  const { data: results } = useQuery(searchCompaniesOptions(debouncedQuery));
  const selectedName = useCompanyName(value);

  const labels = useMemo(() => {
    const entries = new Map<string, string>(
      orEmpty(results).map((company) => {
        return [String(company.id), company.name ?? String(company.id)];
      }),
    );

    if (value !== null && !entries.has(value)) {
      entries.set(value, selectedName ?? value);
    }

    return entries;
  }, [results, selectedName, value]);

  const items = useMemo(() => {
    return [...labels.keys()];
  }, [labels]);

  return (
    <Combobox
      filter={null}
      items={items}
      itemToStringLabel={(item) => {
        return labels.get(item) ?? item;
      }}
      onInputValueChange={setQuery}
      onValueChange={onChange}
      value={value}
    >
      <ComboboxInput className="w-full" id={id} placeholder="Search companies">
        <ComboboxContent>
          <ComboboxList>
            <DiscoverCompanyComboboxItems labels={labels} />
          </ComboboxList>
          <ComboboxEmpty>
            {query.trim() === ""
              ? "Type to search companies."
              : "No companies found."}
          </ComboboxEmpty>
        </ComboboxContent>
      </ComboboxInput>
    </Combobox>
  );
};
