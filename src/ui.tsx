import { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import App from "./App";

export const FontContext = createContext(null);

const UI = () => {
  const [isComponentSelected, setIsComponentSelected] = useState(false);
  const [allFonts, setAllFonts] = useState<allfontsT[]>(null);

  type allfontsT = {
    fontName: {
      family: string;
      style: string;
    };
  };

  onmessage = async (event) => {
    setAllFonts(event.data.pluginMessage);
  };

  return (
    <>
      <FontContext.Provider value={allFonts}>
        <App />
      </FontContext.Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
