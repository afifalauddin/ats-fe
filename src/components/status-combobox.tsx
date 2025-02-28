"use client";

import React, { type FC } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { type JobStatus } from "~/types/api";

const status = [
  {
    label: "Submitted",
    value: "submitted",
  },
  {
    label: "Reviewed",
    value: "reviewed",
  },
  {
    label: "Accepted",
    value: "accepted",
  },
  {
    label: "Rejected",
    value: "rejected",
  },
];

interface Props {
  value?: JobStatus;
  setValueAction: (v: JobStatus) => void;
}

export const StatusCombobox: FC<Props> = ({ value, setValueAction }) => {
  const [open, setOpen] = React.useState(false);

  const onChangeStatus = (value: string) => {
    setValueAction(value as JobStatus);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? status.find((s) => s.value === value)?.label
            : "Select status"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." />
          <CommandList>
            <CommandEmpty>No status found.</CommandEmpty>
            <CommandGroup>
              {status.map((s) => (
                <CommandItem
                  key={s.value}
                  value={s.value}
                  onSelect={(currentValue) => {
                    onChangeStatus(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === s.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {s.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
