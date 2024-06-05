import React from "react";
import useStore from "../hooks/useStore";
import { getCountFromFontMapping } from "../lib/utils";

export function ReplaceButton({}) {
  const fontMapping = useStore((state) => state.fontMapping);
  const count = getCountFromFontMapping(fontMapping);

  return (
    <button
      onClick={() => {
        parent.postMessage(
          {
            pluginMessage: {
              type: "replace",
            },
          },
          "*",
        );
      }}
      className="flex flex-1 items-center justify-center rounded bg-sky-500 px-4 py-3"
    >
      <div className="flex gap-1.5">
        <span className="leading-4 tracking-normal">Replace</span>
        <span className="my-auto justify-center rounded-[139.925px] bg-white bg-opacity-30  px-1 py-1 text-[0.8180636777128005em] leading-3 tracking-wide">
          {count}
        </span>
      </div>
    </button>
  );
}
