import { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import App from "./App";

export const AllUserFonts = createContext(null);
export const SelectionFonts = createContext(null);

const UI = () => {
  const [allUserFonts, setAllUserFonts] = useState(null);
  const [selectionFonts, setSelectionFonts] = useState(null);

  onmessage = async (event) => {
    if (event.data.pluginMessage.type == "allUserFontsData") {
      console.log(event.data.pluginMessage.data);
      setAllUserFonts(event.data.pluginMessage.data);
    }
    if (event.data.pluginMessage.type === "selectionFontsData") {
      setSelectionFonts(event.data.pluginMessage.data);
    }
  };

  return (
    <>
      <AllUserFonts.Provider value={allUserFonts}>
        <SelectionFonts.Provider value={selectionFonts}>
          <App />
        </SelectionFonts.Provider>
      </AllUserFonts.Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
