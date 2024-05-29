import { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import App from "./App";

export const FontContext = createContext(null);
export const SelectedFonts = createContext(null);

const UI = () => {
  const [allFonts, setAllFonts] = useState<allfontsT[]>(null);
  const [selectedFonts, setSelectedFonts] = useState<allfontsT[]>(null);

  type allfontsT = {
    fontName: {
      family: string;
      style: string;
    };
  };

  onmessage = async (event) => {
    if (event.data.pluginMessage.type == "allFonts") {
      console.log(event.data.pluginMessage.data);
      setAllFonts(event.data.pluginMessage.data);
    }
    if (event.data.pluginMessage.type === "selectedFonts") {
      setSelectedFonts(event.data.pluginMessage.data);
    }
  };

  return (
    <>
      <FontContext.Provider value={allFonts}>
        <SelectedFonts.Provider value={selectedFonts}>
          <App />
        </SelectedFonts.Provider>
      </FontContext.Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
