"use client";

import { Combobox as ComboboxPrimitive } from "@base-ui/react/combobox";
import { useMemo } from "react";

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";

const DiscoverFilterComboboxItems = ({
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

interface DiscoverFilterComboboxProps<TValue extends string> {
  id: string;
  onChange: (value: null | TValue) => void;
  options: { label: string; value: TValue }[];
  placeholder: string;
  value: null | TValue;
}

/**
 * Single-select filter combobox. `null` is the empty value, never `undefined`,
 * which Base UI would read as "uncontrolled".
 */
export function DiscoverFilterCombobox<TValue extends string>({
  id,
  onChange,
  options,
  placeholder,
  value,
}: DiscoverFilterComboboxProps<TValue>) {
  const rows = useMemo(() => {
    if (
      value === null ||
      options.some((option) => {
        return option.value === value;
      })
    ) {
      return options;
    }

    return [...options, { label: value, value }];
  }, [options, value]);

  const labels = useMemo(() => {
    return new Map<string, string>(
      rows.map((row) => {
        return [row.value, row.label];
      }),
    );
  }, [rows]);

  const items = useMemo(() => {
    return rows.map((row) => {
      return row.value;
    });
  }, [rows]);

  return (
    <Combobox
      autoComplete="list"
      autoHighlight
      items={items}
      itemToStringLabel={(item) => {
        return labels.get(item) ?? item;
      }}
      onValueChange={onChange}
      value={value}
    >
      <ComboboxInput className="w-full" id={id} placeholder={placeholder}>
        <ComboboxContent>
          <ComboboxList>
            <DiscoverFilterComboboxItems labels={labels} />
          </ComboboxList>
          <ComboboxEmpty>No results.</ComboboxEmpty>
        </ComboboxContent>
      </ComboboxInput>
    </Combobox>
  );
}
