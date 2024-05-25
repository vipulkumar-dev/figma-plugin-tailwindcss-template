import { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import * as bricksLogo from "../assets/bricks-logo.png";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

import MyComponent from "./builder";
import { ComboboxDemo } from "../components/ui/comboBox";

const UI = () => {
  const [isComponentSelected, setIsComponentSelected] = useState(false);

  onmessage = async (event: MessageEvent) => {
    const pluginMessage = event.data.pluginMessage;
    if (pluginMessage.type === "selection-change") {
      setIsComponentSelected(pluginMessage.isComponentSelected);
    }
  };

  return (
    <>
      <MyComponent></MyComponent>
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
