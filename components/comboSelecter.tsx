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

export function ComboSelecter({
  currentFontFamily,
}: {
  currentFontFamily?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  const setFontMapping = useStore((state) => state.setFontMapping);
  const fontMapping = useStore((state) => state.fontMapping);

  const allUserFonts = useContext(AllUserFonts);
  const [allUserFontsFamilyObject, allUserFontsFamilyArray] =
    allUserFontToOnlyFamily(allUserFonts);

  function handleSelect(targetFont) {
    let tempFontMapping = {};

    for (const key in fontMapping) {
      const fontFamily = key.split(" - ")[0];
      const fontStyle = key.split(" - ")[1];

      const isStyleAvailable = allUserFontsFamilyObject[targetFont].find(
        (AvailabefontStyle) => {
          return AvailabefontStyle == fontStyle;
        },
      );

      // console.log(allUserFontsFamilyObject[targetFont]);
      // console.log(isStyleAvailable);

      if (isStyleAvailable == undefined) {
        // tempFontMapping[key] = "Style Not Found";
      }

      if (fontFamily === currentFontFamily && isStyleAvailable) {
        tempFontMapping[key] = targetFont + " - " + fontStyle;
      }
    }

    setFontMapping({ ...fontMapping, ...tempFontMapping });

    // const parent = window.parent;

    parent.postMessage(
      {
        pluginMessage: {
          type: "selectFont",
          data: { ...fontMapping, ...tempFontMapping },
        },
      },
      "*",
    );

    console.log(tempFontMapping);

    setOpen(false);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="flex aspect-square  w-[26px] items-center justify-center   gap-0 rounded border border-solid border-input/10 border-white border-opacity-10 bg-none  p-0 font-normal text-white text-opacity-60"
        >
          <svg
            className="pointer-events-none w-[0.8em]"
            viewBox="0 0 12 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.311584 1.80003C0.311584 2.79414 1.11747 3.60003 2.11158 3.60003C3.1057 3.60003 3.91158 2.79414 3.91158 1.80003C3.91158 0.805918 3.1057 3.05176e-05 2.11158 3.05176e-05C1.11747 3.05176e-05 0.311584 0.805918 0.311584 1.80003ZM7.51158 1.80003C7.51158 2.79414 8.31747 3.60003 9.31158 3.60003C10.3057 3.60003 11.1116 2.79414 11.1116 1.80003C11.1116 0.805918 10.3057 3.05176e-05 9.31158 3.05176e-05C8.31747 3.05176e-05 7.51158 0.805918 7.51158 1.80003ZM9.31158 10.8C8.31747 10.8 7.51158 9.99414 7.51158 9.00003C7.51158 8.00592 8.31747 7.20003 9.31158 7.20003C10.3057 7.20003 11.1116 8.00592 11.1116 9.00003C11.1116 9.99414 10.3057 10.8 9.31158 10.8ZM0.311584 9.00003C0.311584 9.99414 1.11747 10.8 2.11158 10.8C3.1057 10.8 3.91158 9.99414 3.91158 9.00003C3.91158 8.00592 3.1057 7.20003 2.11158 7.20003C1.11747 7.20003 0.311584 8.00592 0.311584 9.00003Z"
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
                {allUserFontsFamilyArray?.map((font, index) => (
                  <CommandItem key={font.fontFamily} onSelect={handleSelect}>
                    <span>{`${font.fontFamily}`}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          ) : (
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {allUserFontsFamilyArray?.slice(0, 50)?.map((font, index) => (
                  <CommandItem key={font.fontFamily} onSelect={handleSelect}>
                    <span>{`${font.fontFamily}`}</span>
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

function allUserFontToOnlyFamily(allUserFonts): [any, any] {
  const allUserFontsFamilyObject = {};
  const allUserFontsFamilyArray = [];
  if (!allUserFonts) {
    return [allUserFontsFamilyObject, allUserFontsFamilyArray];
  }

  for (const font of allUserFonts) {
    if (!allUserFontsFamilyObject[font.fontName.family]) {
      allUserFontsFamilyObject[font.fontName.family] = [font.fontName.style];
    } else {
      allUserFontsFamilyObject[font.fontName.family].push(font.fontName.style);
    }
  }

  for (const key in allUserFontsFamilyObject) {
    allUserFontsFamilyArray.push({
      fontFamily: key,
    });
  }

  // console.log(allUserFontsFamilyObject);
  // console.log(allUserFontsFamilyArray);

  return [allUserFontsFamilyObject, allUserFontsFamilyArray];
}
