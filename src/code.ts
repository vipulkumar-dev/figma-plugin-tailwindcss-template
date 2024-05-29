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

// This function will get all selected text layers' fonts from the active page
function updateMappingObject(textLayers) {
  fontMapping = {};
  textLayers.forEach((textNode) => {
    const key = textNode.fontName.family + " - " + textNode.fontName.style;
    if (!fontMapping.hasOwnProperty(key)) {
      fontMapping[key] = null;
    }
  });
}

// This function will load all fonts available to the user in Figma

async function replaceFontInTextLayers(textLayers) {
  textLayers.forEach(async (textNode) => {
    const newFont =
      fontMapping[textNode.fontName.family + textNode.fontName.style];
    if (newFont) {
      await figma.loadFontAsync(newFont);
      textNode.fontName = newFont;
    }
  });
}

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

const loadPlugin = async () => {
  const Fonts = await figma.listAvailableFontsAsync();
  figma.ui.postMessage({ type: "allFonts", data: Fonts });
  updateMappingObject(selectedTextNodes);
  const convertedFonts = convertFontObjectToUserFonts(fontMapping);
  figma.ui.postMessage({ type: "selectedFonts", data: convertedFonts });
};

loadPlugin();

// Main function to run the plugin
async function Replace() {
  // const userFontChoice = userPicksFont(allFonts);
  // const matchingTextLayers = findTextLayersWithFont(userFontChoice);

  //if that layer has that font than we change it to that
  // await replaceFontInTextLayers(selectedTextNodes);
  updateMappingObject(selectedTextNodes);
  const convertedFonts = convertFontObjectToUserFonts(fontMapping);
  figma.ui.postMessage({ type: "selectedFonts", data: convertedFonts });
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

// Example usage:

figma.ui.onmessage = (message) => {
  if (message.type == "replace") {
    Replace();
  }
  if (message.type == "selectFont") {
    console.log(message.data);
    fontMapping[message.data.currentFont] = message.data.targetFont;
    console.log(fontMapping);
  }
};
