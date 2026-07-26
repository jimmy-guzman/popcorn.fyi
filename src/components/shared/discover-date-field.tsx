"use client";

import { format, isValid, parseISO } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const parseStoredDate = (value: string | undefined) => {
  if (!value) {
    return undefined;
  }

  const parsed = parseISO(value);

  return isValid(parsed) ? parsed : undefined;
};

interface DiscoverDateFieldProps {
  id: string;
  onChange: (value: string | undefined) => void;
  placeholder?: string;
  value: string | undefined;
}

export const DiscoverDateField = ({
  id,
  onChange,
  placeholder = "Pick a date",
  value,
}: DiscoverDateFieldProps) => {
  const [open, setOpen] = useState(false);
  const selected = parseStoredDate(value);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger
        className="w-full justify-between font-normal"
        id={id}
        render={<Button variant="outline" />}
      >
        <span className="truncate">
          {selected ? format(selected, "MMM d, yyyy") : placeholder}
        </span>
        <CalendarIcon className="shrink-0 text-muted-foreground" />
      </PopoverTrigger>
      <PopoverContent align="end" className="w-auto p-0">
        <Calendar
          captionLayout="dropdown"
          mode="single"
          onSelect={(date) => {
            onChange(date ? format(date, "yyyy-MM-dd") : undefined);
            setOpen(false);
          }}
          selected={selected}
        />
      </PopoverContent>
    </Popover>
  );
};
