figma.showUI(__html__, { height: 620, width: 350 });

// figma.on("selectionchange", async () => {
//   figma.ui.postMessage({
//     type: "selection-change",
//     isComponentSelected: figma.currentPage.selection.length > 0,
//     selectedComponents: figma.currentPage.selection.map((x) => x.name),
//   });
// });

let fontMapping = {
  MontserratBlack: { family: "Satoshi", style: "Regular" },
  MontserratExtraBold: { family: "Satoshi", style: "Bold" },
};

// This function will get all selected text layers' fonts from the active page
function updateMappingObject(textLayers) {
  textLayers.forEach((textNode) => {
    const key = textNode.fontName.family + textNode.fontName.style;
    if (!fontMapping.hasOwnProperty(key)) {
      fontMapping[key] = null;
    }
  });
}

// This function will load all fonts available to the user in Figma
async function loadAllUserFonts() {
  const allFonts = await figma.listAvailableFontsAsync();
  return allFonts;
}

// This function allows the user to pick a font and its weight
function userPicksFont(allFonts) {
  // Implement UI for user to pick a font and weight
  // Return the user's choice
}

// // This function finds all text layers that have the specified font
// function findTextLayersWithFont(fontName) {
//   const allTextLayers = figma.currentPage.findAll(
//     (node) => node.type === "TEXT"
//   );
//   // const matchingTextLayers = allTextLayers.filter(
//   //   (textNode) => textNode.fontName.family === fontName.family
//   // );
//   // return matchingTextLayers;
// }

// This function replaces the font in all matching text layers with the new user-picked font
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
let allTextNodes: TextNode[] = [];

selectedNodes.forEach((node) => {
  allTextNodes = allTextNodes.concat(getSelectedTextNodes(node));
});

const loadPlugin = async () => {
  const Fonts = await loadAllUserFonts();
  figma.ui.postMessage(Fonts);
};

loadPlugin();

// Main function to run the plugin
async function runPlugin() {
  // const userFontChoice = userPicksFont(allFonts);
  // const matchingTextLayers = findTextLayersWithFont(userFontChoice);

  //if that layer has that font than we change it to that
  await replaceFontInTextLayers(allTextNodes);
  updateMappingObject(allTextNodes);
  console.log(allTextNodes);
  console.log(fontMapping);
}

figma.ui.onmessage = (message) => {
  if (message.type == "replace") {
    runPlugin();
  }
  if (message.type == "selectFont") {
    console.log(message.data);
    fontMapping[message.data.currentFont] = message.data.targetFont;
    console.log(fontMapping);
  }
};
