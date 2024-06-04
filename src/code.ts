figma.showUI(__html__, { height: 600, width: 350 });

let fontMapping = {};

(async function loadPlugin() {
  Reload();
})();

// Main function to run the plugin
async function Replace() {
  const selectedTextNodes = getAllSelectedTextNodes();
  await replaceFontInTextNodes(selectedTextNodes);
  console.log("Font replaced successfully");
}

async function Reload() {
  const allUserFonts = await figma.listAvailableFontsAsync();
  figma.ui.postMessage({ type: "allUserFontsData", data: allUserFonts });
  const selectedTextNodes = getAllSelectedTextNodes();
  updateFontMapping(selectedTextNodes);
  figma.ui.postMessage({ type: "fontMappingData", data: fontMapping });
}

// Example usage:

figma.ui.onmessage = (message) => {
  switch (message.type) {
    case "replace":
      Replace();

      break;
    case "reload":
      Reload();

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

async function replaceFontInTextNodes(textNodes) {
  textNodes.forEach(async (textNode) => {
    const targetFont =
      fontMapping[textNode.fontName.family + " - " + textNode.fontName.style];

    if (targetFont) {
      const fontFamily = targetFont.split(" - ")[0];
      const fontStyle = targetFont.split(" - ")[1];

      const targetFontObj = { family: fontFamily, style: fontStyle };

      await figma.loadFontAsync(targetFontObj);
      textNode.fontName = targetFontObj;
    }
  });
}

function updateFontMapping(textNodes) {
  fontMapping = {};
  textNodes.forEach((textNode) => {
    if (!textNode.fontName.family || !textNode.fontName.style) return;
    const key = textNode.fontName.family + " - " + textNode.fontName.style;
    if (!fontMapping.hasOwnProperty(key)) {
      fontMapping[key] = null;
    }
  });
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
