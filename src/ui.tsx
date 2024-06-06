import { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";

import App from "./App";
import useStore from "../hooks/useStore";

export const AllUserFonts = createContext(null);

const UI = () => {
  const [allUserFonts, setAllUserFonts] = useState(null);

  const setFontMapping = useStore((state) => state.setFontMapping);

  onmessage = async (event) => {
    if (event.data.pluginMessage.type == "allUserFontsData") {
      // console.log(event.data.pluginMessage.data);
      setAllUserFonts(event.data.pluginMessage.data);
    }
    if (event.data.pluginMessage.type === "fontMappingData") {
      setFontMapping(event.data.pluginMessage.data);
    }
  };

  return (
    <>
      <AllUserFonts.Provider value={allUserFonts}>
        <App />
      </AllUserFonts.Provider>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
