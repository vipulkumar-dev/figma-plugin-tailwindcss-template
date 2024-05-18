import { Checkbox } from "../components/ui/checkbox";
import * as React from "react";

interface FontSelectorProps {
  fontName: string;
  regularFont: string;
  boldFont?: string;
  semiBoldFont?: string;
  italicFont?: string;
  lightFont?: string;
}

const FontSelector: React.FC<FontSelectorProps> = ({
  fontName,
  regularFont,
  boldFont,
  semiBoldFont,
  italicFont,
  lightFont,
}) => {
  const fontStyles = [
    { label: "Regular", value: regularFont },
    { label: "Bold", value: boldFont },
    { label: "Semi Bold", value: semiBoldFont },
    { label: "Italic", value: italicFont },
    { label: "Light", value: lightFont },
  ];

  const fonts = [
    {
      fontName: "Inter",
      fontWeights: ["Regular", "Bold", "Semi Bold", "Italic"],
    },
    { fontName: "Lato", fontWeights: ["Regular", "Bold"] },
  ];

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
      {fontStyles.map(
        (style) =>
          style.value && (
            <div
              key={style.label}
              className="flex gap-3 mt-[0.8180636777128005em] mx-[1.299545159194282em]   tracking-normal leading-5"
            >
              <div className=" justify-center py-[0.7270955165692008em] px-[1.0909681611435997em] text-white whitespace-nowrap rounded-sm border border-solid  border-white border-opacity-10 w-[115px]">
                {style.label}
              </div>
              <div className="flex grow gap-0  pr-3 pl-4 w-auto rounded border border-solid bg-[#ffffff0a]  border-white border-opacity-10 text-white text-opacity-60">
                <div className="flex-1 my-auto py-[0.7270955165692008em] ">
                  {style.value}
                </div>
                <img
                  loading="lazy"
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/69378805b528a730b4a6ec3d7c57ae0eedf72120197c9f2c35c94eae57ef34d8?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
                  alt=""
                  className="shrink-0  w-[0.7147498375568551em]"
                />
              </div>
            </div>
          )
      )}
    </div>
  );
};

const MyComponent: React.FC = () => {
  return (
    <div className="flex flex-col pt-[0.8180636777128005em] text-[13.39px] h-screen bg-[#2C2C2C]  max-w-[375px]">
      {/* <div className="w-full bg-white bg-opacity-10 min-h-[1px]" /> */}
      {/* <header className="flex gap-0 justify-between p-1.5 w-full text-xs font-semibold tracking-normal leading-4 text-center text-white bg-zinc-800">
        <div className="flex gap-0">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c63d2f639d43aeca5ebdb1478cf2b35f760a5dc81ff174f8fd98d8a4a3a8e603?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
            alt=""
            className="shrink-0 w-11 aspect-[0.98]"
          />
          <h1 className="my-auto">Simple Font Replacer</h1>
        </div>
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/2bfbe8bcf5fcb752711daace39037a21f6615b80fc2cf6f3b8efce952b2b2a04?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
          alt=""
          className="shrink-0 w-11 aspect-[0.98]"
        />
      </header> */}
      {/* <div className="w-full bg-white bg-opacity-10 min-h-[1px]" /> */}
      <main className="flex pt-[0.8180636777128005em] flex-col justify-start w-full h-full overflow-auto custom_scrollbar">
        <section className="flex flex-col gap-[2.4541910331384016em]">
          {/* <div className="flex gap-2.5 justify-between px-px mr-5 ml-6 bg-zinc-800">
            <div className="my-auto text-xs tracking-normal leading-4 text-white text-opacity-80">
              Inter
            </div>
            <div className="flex justify-center items-center p-2.5 rounded border border-solid bg-black bg-opacity-0 border-white border-opacity-10 h-[31px] w-[31px]">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/f45135763c8cf2ac327a9526e7a0508d968206863eb8aa9985f212f41b3fbfd8?apiKey=40dc68eb1cfd47748774463cbd8a70f3&"
                alt=""
                className="aspect-square fill-white fill-opacity-50 w-[11px]"
              />
            </div>
          </div> */}
          <FontSelector
            fontName="Inter"
            regularFont="Inter - Regular"
            boldFont="Select Font"
            semiBoldFont="Select Font"
            italicFont="Select Font"
          />
          <FontSelector
            fontName="Lato"
            regularFont="Select Font"
            boldFont="Select Font"
            lightFont="Select Font"
          />
        </section>
      </main>
      <div className="flex gap-[0.8em] my-[1em] items-center  px-[1.299545159194282em] mt-auto  tracking-normal leading-4 text-white text-opacity-80">
        <Checkbox className="w-[1.2em] aspect-square" />
        <div className="flex-1 my-auto">Replace on Text Styles</div>
      </div>
      <div className="w-full bg-white bg-opacity-10 min-h-[1px]" />
      <footer className="flex gap-3 p-3 w-full font-semibold text-center  text-white whitespace-nowrap bg-zinc-800">
        <button className="flex flex-1 justify-center items-center px-4 py-3 bg-sky-500 rounded">
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

export default MyComponent;
