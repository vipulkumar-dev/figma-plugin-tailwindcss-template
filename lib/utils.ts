import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFontMappingToSelectionFormat(fontObject) {
  const userFontsObj = {};

  for (const key in fontObject) {
    const fontFamily = key.split(" - ")[0];
    const fontStyle = key.split(" - ")[1];

    if (!userFontsObj[fontFamily]) {
      userFontsObj[fontFamily] = {
        fontFamily,
        fontStyles: [fontStyle],
      };
    } else {
      userFontsObj[fontFamily].fontStyles.push(fontStyle);
    }
  }

  const userFontsArray = [];

  for (const fontFamily in userFontsObj) {
    const { fontStyles } = userFontsObj[fontFamily];
    userFontsArray.push({ fontFamily, fontStyles });
  }

  return userFontsArray;
}

export function getCountFromFontMapping(fontMapping) {
  let count = 0;
  for (const key in fontMapping) {
    if (fontMapping[key]) {
      count++;
    }
  }
  return count;
}
