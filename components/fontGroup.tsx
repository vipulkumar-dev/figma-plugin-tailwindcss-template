import * as React from "react";
import { FontSelecter } from "../components/fontSelecter";
import { ComboSelecter } from "../components/comboSelecter";

interface FontGroupProps {
  fontFamily: string;
  fontStyles: string[];
}

export const FontGroup = ({ fontFamily, fontStyles }: FontGroupProps) => {
  return (
    <div>
      <div className="mx-[1.299545159194282em]  mt-0 flex justify-between gap-2.5 whitespace-nowrap  px-px leading-4 tracking-normal text-white text-opacity-75">
        <div className="my-auto cursor-default">{fontFamily}</div>
        <ComboSelecter currentFontFamily={fontFamily} />
      </div>
      {fontStyles?.map((fontStyle) => (
        <div
          key={fontStyle}
          className="mx-[1.299545159194282em] mt-[0.8180636777128005em] flex gap-3   leading-5 tracking-normal"
        >
          <div className="w-[115px] cursor-default justify-center whitespace-nowrap rounded-sm border border-solid border-white border-opacity-10  px-[1.0909681611435997em] py-[0.7270955165692008em] text-white">
            {fontStyle}
          </div>
          <FontSelecter
            key={fontFamily + " - " + fontStyle}
            currentFont={fontFamily + " - " + fontStyle}
          ></FontSelecter>
        </div>
      ))}
    </div>
  );
};
