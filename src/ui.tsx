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
      {/* <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Font" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select> */}
      <div className="absolute">
        <ComboboxDemo></ComboboxDemo>
      </div>
      {/* <MyComponent></MyComponent> */}
    </>
  );
};

const root = ReactDOM.createRoot(document.getElementById("react-page"));

root.render(<UI />);
