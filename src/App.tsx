import * as React from "react";
import useStore from "../hooks/useStore";
import { ReplaceButton } from "../components/replaceButton";
import { convertFontMappingToSelectionFormat } from "../lib/utils";
import { FontGroup } from "../components/fontGroup";

const App: React.FC = () => {
  const fontMapping = useStore((state) => state.fontMapping);
  const selectionFonts = convertFontMappingToSelectionFormat(fontMapping);

  return (
    <div className="flex h-screen max-w-[375px] flex-col bg-[#2C2C2C] pt-[0.6361273554256011em] text-[13px]">
      <main className="flex  h-full w-full flex-col justify-start overflow-auto py-[1em]">
        <section className="flex flex-col gap-[2.4541910331384016em]">
          {selectionFonts?.map((font) => (
            <FontGroup
              key={font.fontFamily}
              fontFamily={font.fontFamily}
              fontStyles={font.fontStyles}
            />
          ))}
        </section>
      </main>
      <div className="mt-auto flex  items-center  gap-[0.5em] p-[1.299545159194282em]  leading-4 tracking-normal text-white text-opacity-80">
        <svg
          viewBox="0 0 24 24"
          className="aspect-square w-[1.2em]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="1.5" />
          <path
            d="M12 17V11"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle
            cx="1"
            cy="1"
            r="1"
            transform="matrix(1 0 0 -1 11 9)"
            fill="white"
          />
        </svg>
        <div className="my-auto flex-1 cursor-default">
          Select Layers, then reload to load fonts.
        </div>
      </div>
      <div className="min-h-[1px] w-full bg-white bg-opacity-10" />
      <footer className="flex w-full gap-3 whitespace-nowrap bg-zinc-800 p-3  text-center font-semibold text-white">
        <ReplaceButton />
        <button
          onClick={() => {
            parent.postMessage({ pluginMessage: { type: "reload" } }, "*");
          }}
          className="grid aspect-[1.02] w-[45px] shrink-0 place-content-center rounded bg-[#383838]"
        >
          <svg
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[1em]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.04233 4.42662L2.68257 3.06686H5.90208V2.06686H2.68257L4.04233 0.707107L3.33522 0L1.12191 2.21331L0.768357 2.56686L1.12191 2.92041L3.33522 5.13372L4.04233 4.42662ZM5.90215 12.8736C8.60954 12.8736 10.8043 10.6788 10.8043 7.97141C10.8043 5.26402 8.60954 3.06925 5.90215 3.06925V2.06925C9.16182 2.06925 11.8043 4.71174 11.8043 7.97141C11.8043 11.2311 9.16182 13.8736 5.90215 13.8736C2.64248 13.8736 0 11.2311 0 7.97141H1C1 10.6788 3.19477 12.8736 5.90215 12.8736Z"
              fill="#D7D7D7"
            />
          </svg>
        </button>
      </footer>
    </div>
  );
};

export default App;
