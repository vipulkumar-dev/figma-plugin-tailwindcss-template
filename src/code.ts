figma.showUI(__html__, { height: 620, width: 350 });

let fontMapping = {};

// figma.on("selectionchange", async () => {
//   // figma.ui.postMessage({
//   //   type: "selection-change",
//   //   isComponentSelected: figma.currentPage.selection.length > 0,
//   //   selectedComponents: figma.currentPage.selection.map((x) => x.name),
//   // });

//   updateMappingObject(selectedTextNodes);
//   console.log(fontMapping);
// });

async function replaceFontInTextLayers(textLayers) {
  textLayers.forEach(async (textNode) => {
    const newFont =
      fontMapping[textNode.fontName.family + " - " + textNode.fontName.style];

    if (newFont) {
      const fontFamily = newFont.split(" - ")[0];
      const fontWeight = newFont.split(" - ")[1];

      const newFontObj = { family: fontFamily, style: fontWeight };

      await figma.loadFontAsync(newFontObj);
      textNode.fontName = newFontObj;
    }
  });
}

const loadPlugin = async () => {
  const Fonts = await figma.listAvailableFontsAsync();
  figma.ui.postMessage({ type: "allFonts", data: Fonts });
  const selectedTextNodes = getAllSelectedTextNodes();
  updateMappingObject(selectedTextNodes);
  const convertedFonts = convertFontObjectToUserFonts(fontMapping);
  figma.ui.postMessage({ type: "selectedFonts", data: convertedFonts });
};

loadPlugin();

// Main function to run the plugin
async function Replace() {
  const selectedTextNodes = getAllSelectedTextNodes();
  await replaceFontInTextLayers(selectedTextNodes);
  console.log("Font replaced successfully");
}

// Example usage:

figma.ui.onmessage = (message) => {
  switch (message.type) {
    case "replace":
      Replace();

      break;

    case "selectFont":
      console.log(message.data);
      fontMapping[message.data.currentFont] = message.data.targetFont;
      console.log(fontMapping);

      break;
    default:
    // code block
  }
};

///utils

function updateMappingObject(textLayers) {
  fontMapping = {};
  textLayers.forEach((textNode) => {
    const key = textNode.fontName.family + " - " + textNode.fontName.style;
    if (!fontMapping.hasOwnProperty(key)) {
      fontMapping[key] = null;
    }
  });
}

function convertFontObjectToUserFonts(fontObject) {
  const userFontsObj = {};

  for (const fontName in fontObject) {
    const fontFamily = fontName.split(" - ")[0];
    const fontWeight = fontName.split(" - ")[1];

    if (!userFontsObj[fontFamily]) {
      userFontsObj[fontFamily] = {
        fontName: fontFamily,
        fontWeights: [fontWeight],
      };
    } else {
      userFontsObj[fontFamily].fontWeights.push(fontWeight);
    }
  }

  const userFontsArray = [];

  for (const fontName in userFontsObj) {
    const { fontWeights } = userFontsObj[fontName];
    userFontsArray.push({ fontName, fontWeights });
  }

  return userFontsArray;
}

function getAllSelectedTextNodes() {
  function getSelectedTextNodes(node) {
    let textNodes = [];
    if (node.type === "TEXT") {
      textNodes.push(node);
    } else if ("children" in node) {
      for (const child of node.children) {
        textNodes = textNodes.concat(getSelectedTextNodes(child));
      }
    }
    return textNodes;
  }

  const selectedNodes = figma.currentPage.selection;
  let selectedTextNodes: TextNode[] = [];

  selectedNodes.forEach((node) => {
    selectedTextNodes = selectedTextNodes.concat(getSelectedTextNodes(node));
  });

  return selectedTextNodes;
}
