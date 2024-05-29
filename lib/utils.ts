import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertFontObjectToUserFonts(fontObject) {
  const userFontsObj = {};

  for (const fontName in fontObject) {
    const fontFamily = fontName.split(" - ")[0];
    const fontWeight = fontName.split(" - ")[1];

    if (!userFontsObj[fontFamily]) {
      userFontsObj[fontFamily] = {
        fontName: fontFamily,
        fontWeights: [fontWeight],
      };
    } else {
      userFontsObj[fontFamily].fontWeights.push(fontWeight);
    }
  }

  const userFontsArray = [];

  for (const fontName in userFontsObj) {
    const { fontWeights } = userFontsObj[fontName];
    userFontsArray.push({ fontName, fontWeights });
  }

  return userFontsArray;
}
