"use client";

import * as React from "react";
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
import { useContext } from "react";
import { AllUserFonts } from "../../src/ui";

export function Combobox({ currentFont }: { currentFont?: string }) {
  const [open, setOpen] = React.useState(false);
  const [selectedStatus, setSelectedStatus] = React.useState<String | null>(
    null
  );

  const [search, setSearch] = React.useState("");

  const allUserFonts = useContext(AllUserFonts);
  const all50UserFonts = allUserFonts.slice(0, 50);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="justify-between border-input/10 font-normal  flex grow gap-0 py-[0.7270955165692008em] px-[1.0909681611435997em] w-auto rounded border border-solid bg-[#ffffff0a]  border-white border-opacity-10 text-white text-opacity-60"
        >
          {selectedStatus ? (
            <div className="text-white truncate max-w-[125px]">
              {selectedStatus}
            </div>
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
          <CommandInput
            value={search}
            onValueChange={setSearch}
            placeholder="Search Font..."
          />
          {search !== "" ? (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {allUserFonts?.map((font, index) => (
                  <CommandItem
                    key={index}
                    onSelect={(targetFont) => {
                      setSelectedStatus(targetFont);
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: "selectFont",
                            data: {
                              currentFont,
                              targetFont,
                            },
                          },
                        },
                        "*"
                      );
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
          ) : (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {all50UserFonts?.map((font, index) => (
                  <CommandItem
                    key={index}
                    onSelect={(targetFont) => {
                      setSelectedStatus(targetFont);
                      parent.postMessage(
                        {
                          pluginMessage: {
                            type: "selectFont",
                            data: {
                              currentFont,
                              targetFont,
                            },
                          },
                        },
                        "*"
                      );
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
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
