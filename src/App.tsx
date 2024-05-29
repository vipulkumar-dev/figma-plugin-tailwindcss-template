import { ComboboxDemo } from "../components/ui/comboBox";
import { Checkbox } from "../components/ui/checkbox";
import * as React from "react";
import { useContext } from "react";
import { SelectedFonts } from "../src/ui";

interface FontSelectorProps {
  fontName: string;
  fontWeights: string[];
}

const FontSelector: React.FC<FontSelectorProps> = ({
  fontName,
  fontWeights,
}) => {
  return (
    <div>
      <div className="flex gap-2.5 justify-between px-px mt-0 mr-5 ml-6  tracking-normal leading-4 whitespace-nowrap text-white text-opacity-75">
        <div className="my-auto">{fontName}</div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/b1cd2252f081dc386f97e7f5ea59a97e0501d863054b38d1b4d9178f49672047?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
          alt=""
          className="shrink-0 aspect-square w-[2.014294996751137em]"
        />
      </div>
      {fontWeights?.map((weight) => (
        <div
          key={weight}
          className="flex gap-3 mt-[0.8180636777128005em] mx-[1.299545159194282em]   tracking-normal leading-5"
        >
          <div className=" justify-center py-[0.7270955165692008em] px-[1.0909681611435997em] text-white whitespace-nowrap rounded-sm border border-solid  border-white border-opacity-10 w-[115px]">
            {weight}
          </div>
          {/* <div className="flex grow gap-0  pr-3 pl-4 w-auto rounded border border-solid bg-[#ffffff0a]  border-white border-opacity-10 text-white text-opacity-60">
                <div className="flex-1 my-auto py-[0.7270955165692008em] ">
                  {style.value}
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/69378805b528a730b4a6ec3d7c57ae0eedf72120197c9f2c35c94eae57ef34d8?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
                  alt=""
                  className="shrink-0  w-[0.7147498375568551em]"
                />
              </div> */}
          <ComboboxDemo
            key={fontName + " - " + weight}
            currentFont={fontName + " - " + weight}
          ></ComboboxDemo>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const selectedFonts = useContext(SelectedFonts);
  console.log(selectedFonts);

  return (
    <div className="flex flex-col pt-[0.8180636777128005em] text-[13.39px] h-screen bg-[#2C2C2C]  max-w-[375px]">
      <main className="flex pt-[0.8180636777128005em] flex-col justify-start w-full h-full overflow-auto custom_scrollbar">
        <section className="flex flex-col gap-[2.4541910331384016em]">
          {selectedFonts?.map((style) => (
            <FontSelector
              key={style.fontName}
              fontName={style.fontName}
              fontWeights={style.fontWeights}
            />
          ))}
        </section>
      </main>
      <div className="flex gap-[0.8em] my-[1em] items-center  px-[1.299545159194282em] mt-auto  tracking-normal leading-4 text-white text-opacity-80">
        <Checkbox checked className="w-[1.2em] aspect-square" />
        <div className="flex-1 my-auto">Replace on Text Styles</div>
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
              10
            </span>
          </div>
        </button>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/9d12b953d98d6edc33d94c0261663986e0a82a39b8e8612bd9b20c685529153b?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
          alt=""
          className="shrink-0 aspect-[1.02] w-[45px]"
        />
      </footer>
    </div>
  );
};

export default App;
