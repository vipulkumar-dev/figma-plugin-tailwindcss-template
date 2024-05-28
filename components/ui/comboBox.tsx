"use client";

import * as React from "react";
import {
  ArrowUpCircle,
  CheckCircle2,
  Circle,
  HelpCircle,
  LucideIcon,
  XCircle,
} from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../../components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { useRef } from "react";

type Status = {
  value: string;
  label: string;
  icon: LucideIcon;
};

const statuses: Status[] = [
  {
    value: "backlog",
    label: "Backlog",
    icon: HelpCircle,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: ArrowUpCircle,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircle2,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: XCircle,
  },
];

type allfontsT = {
  fontName: {
    family: string;
    style: string;
  };
};

export function ComboboxDemo(allfonts) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<String | null>(
    null
  );

  console.log(allfonts, "Render");
  if (allfonts.length === 0) {
    return;
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between border-input/10 font-normal  flex grow gap-0 py-[0.7270955165692008em] px-[1.0909681611435997em] w-auto rounded border border-solid bg-[#ffffff0a]  border-white border-opacity-10 text-white text-opacity-60"
        >
          {selectedStatus ? (
            <div className="text-white">{selectedStatus}</div>
          ) : (
            <div>Select Font</div>
          )}
          <svg
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0  w-[0.7147498375568551em]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.989422 2L1.48413 2.49471L5.18718 6.19776L8.89023 2.49471L9.38494 2L10.3744 2.98942L9.87965 3.48413L5.68189 7.68189L5.18718 8.1766L4.69247 7.68189L0.494711 3.48413L0 2.98942L0.989422 2Z"
              fill="white"
              fillOpacity="0.5"
            />
          </svg>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0" side="bottom" align="end">
        <Command>
          <CommandInput placeholder="Search Font..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {allfonts.allfonts?.map((font, index) => (
                <CommandItem
                  key={index}
                  onSelect={(value) => {
                    setSelectedStatus(value);
                    setOpen(false);
                  }}
                >
                  <span>
                    {`${font.fontName.family} - ${font.fontName.style}`}
                  </span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
