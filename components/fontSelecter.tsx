"use client";

import * as React from "react";
import { Button } from "./ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useContext } from "react";
import { AllUserFonts } from "../src/ui";
import useStore from "../hooks/useStore";

export function FontSelecter({ currentFont }: { currentFont?: string }) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const updateFontMapping = useStore((state) => state.updateFontMapping);
  const fontMapping = useStore((state) => state.fontMapping);

  const allUserFonts = useContext(AllUserFonts);

  function handleSelect(targetFont) {
    if (targetFont === "Select none") {
      updateFontMapping({ ...fontMapping, [currentFont]: null });
    } else {
      updateFontMapping({ ...fontMapping, [currentFont]: targetFont });
    }

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
      "*",
    );
    setOpen(false);
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex w-auto grow  justify-between gap-0 rounded border border-solid border-input/10 border-white border-opacity-10 bg-[#ffffff0a] px-[1.0909681611435997em]  py-[0.7270955165692008em] font-normal text-white text-opacity-60"
        >
          {fontMapping[currentFont] ? (
            <div className="max-w-[125px] truncate text-white">
              {fontMapping[currentFont]}
            </div>
          ) : (
            <div>Select Font</div>
          )}
          <svg
            viewBox="0 0 11 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[0.7147498375568551em]  shrink-0"
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
                  <CommandItem key={index} onSelect={handleSelect}>
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
                <CommandItem onSelect={handleSelect}>
                  <span>{`Select none`}</span>
                </CommandItem>
                {allUserFonts?.slice(0, 50)?.map((font, index) => (
                  <CommandItem key={index} onSelect={handleSelect}>
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
