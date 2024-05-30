import * as React from "react";
import { useContext } from "react";
import { Combobox } from "../components/ui/comboBox";
import { Checkbox } from "../components/ui/checkbox";
import { SelectionFonts } from "../src/ui";

interface FontGroupProps {
  fontFamily: string;
  fontStyles: string[];
}

const FontGroup = ({ fontFamily, fontStyles }: FontGroupProps) => {
  return (
    <div>
      <div className="flex gap-2.5 justify-between px-px mt-0 mr-5 ml-6  tracking-normal leading-4 whitespace-nowrap text-white text-opacity-75">
        <div className="my-auto">{fontFamily}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1cd2252f081dc386f97e7f5ea59a97e0501d863054b38d1b4d9178f49672047?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
          alt=""
          className="shrink-0 aspect-square w-[2.014294996751137em]"
        />
      </div>
      {fontStyles?.map((fontStyle) => (
        <div
          key={fontStyle}
          className="flex gap-3 mt-[0.8180636777128005em] mx-[1.299545159194282em]   tracking-normal leading-5"
        >
          <div className=" justify-center py-[0.7270955165692008em] px-[1.0909681611435997em] text-white whitespace-nowrap rounded-sm border border-solid  border-white border-opacity-10 w-[115px]">
            {fontStyle}
          </div>
          {/* <div className="flex grow gap-0  pr-3 pl-4 w-auto rounded border border-solid bg-[#ffffff0a]  border-white border-opacity-10 text-white text-opacity-60">
                <div className="flex-1 my-auto py-[0.7270955165692008em] ">
                  {fontStyle.value}
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/69378805b528a730b4a6ec3d7c57ae0eedf72120197c9f2c35c94eae57ef34d8?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
                  alt=""
                  className="shrink-0  w-[0.7147498375568551em]"
                />
              </div> */}
          <Combobox
            key={fontFamily + " - " + fontStyle}
            currentFont={fontFamily + " - " + fontStyle}
          ></Combobox>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const selectionFonts = useContext(SelectionFonts);
  console.log(selectionFonts);

  return (
    <div className="flex flex-col pt-[0.6361273554256011em] text-[13.39px] h-screen bg-[#2C2C2C]  max-w-[375px]">
      <main className="flex py-[1em]  flex-col justify-start w-full h-full overflow-auto custom_scrollbar">
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
      <div className="flex gap-[0.6em]  items-center  p-[1.299545159194282em] mt-auto  tracking-normal leading-4 text-white text-opacity-80">
        {/* <Checkbox defaultChecked className="w-[1.2em] aspect-square" /> */}
        <svg
          viewBox="0 0 24 24"
          className="w-[1.2em] aspect-square"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="10" stroke="white" stroke-width="1.5" />
          <path
            d="M12 17V11"
            stroke="white"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle
            cx="1"
            cy="1"
            r="1"
            transform="matrix(1 0 0 -1 11 9)"
            fill="white"
          />
        </svg>

        <div className="flex-1 my-auto">
          Select Layers, then reload to load fonts.
        </div>
      </div>
      <div className="w-full bg-white bg-opacity-10 min-h-[1px]" />
      <footer className="flex gap-3 p-3 w-full font-semibold text-center  text-white whitespace-nowrap bg-zinc-800">
        <button
          onClick={() => {
            parent.postMessage({ pluginMessage: { type: "replace" } }, "*");
          }}
          className="flex flex-1 justify-center items-center px-4 py-3 bg-sky-500 rounded"
        >
          <div className="flex gap-1.5">
            <span className="tracking-normal leading-4">Replace</span>
            <span className="justify-center px-1 py-1 my-auto text-[0.8180636777128005em]  tracking-wide leading-3 bg-white bg-opacity-30 rounded-[139.925px]">
              0
            </span>
          </div>
        </button>
        <button
          onClick={() => {
            parent.postMessage({ pluginMessage: { type: "reload" } }, "*");
          }}
          className="shrink-0 aspect-[1.02] w-[45px] bg-[#383838] rounded grid place-content-center"
        >
          <svg
            viewBox="0 0 12 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-[1em]"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M4.04233 4.42662L2.68257 3.06686H5.90208V2.06686H2.68257L4.04233 0.707107L3.33522 0L1.12191 2.21331L0.768357 2.56686L1.12191 2.92041L3.33522 5.13372L4.04233 4.42662ZM5.90215 12.8736C8.60954 12.8736 10.8043 10.6788 10.8043 7.97141C10.8043 5.26402 8.60954 3.06925 5.90215 3.06925V2.06925C9.16182 2.06925 11.8043 4.71174 11.8043 7.97141C11.8043 11.2311 9.16182 13.8736 5.90215 13.8736C2.64248 13.8736 0 11.2311 0 7.97141H1C1 10.6788 3.19477 12.8736 5.90215 12.8736Z"
              fill="#D7D7D7"
            />
          </svg>
        </button>
        {/* <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d12b953d98d6edc33d94c0261663986e0a82a39b8e8612bd9b20c685529153b?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
          alt=""
          className="shrink-0 aspect-[1.02] w-[45px]"
        /> */}
      </footer>
    </div>
  );
};

export default App;
