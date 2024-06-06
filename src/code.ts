figma.showUI(__html__, { height: 600, width: 350 });

let fontMapping = {};
let unnormalizedStylesObject = {};

(async function loadPlugin() {
  load();
})();

async function replace() {
  const selectedTextNodes = getAllSelectedTextNodes();
  await replaceFontInTextNodes(selectedTextNodes);
  console.log("Font replaced successfully");
}

async function load() {
  const allUserFonts = await figma.listAvailableFontsAsync();
  figma.ui.postMessage({
    type: "allUserFontsData",
    data: normalizeAllUsersFontStyles(allUserFonts),
  });

  createUnnormalizedStylesObject(allUserFonts);

  const selectedTextNodes = getAllSelectedTextNodes();
  addSelectedLayersFontsToFontMapping(selectedTextNodes);
  figma.ui.postMessage({ type: "fontMappingData", data: fontMapping });
}

figma.ui.onmessage = (message) => {
  switch (message.type) {
    case "replace":
      replace();

      break;
    case "reload":
      load();

      break;

    case "selectFont":
      fontMapping = message.data;
      console.log(fontMapping);

      break;
    default:
    // code block
  }
};

///utils

function createUnnormalizedStylesObject(allUserFonts) {
  allUserFonts.forEach((font) => {
    unnormalizedStylesObject[
      font.fontName.family + " - " + normalizeStyle(font.fontName.style)
    ] = font.fontName.style;
  });
}

async function replaceFontInTextNodes(textNodes) {
  textNodes.forEach(async (textNode) => {
    const targetFont =
      fontMapping[textNode.fontName.family + " - " + textNode.fontName.style];

    if (targetFont) {
      const fontFamily = targetFont.split(" - ")[0];
      const fontStyle = unnormalizedStylesObject[targetFont];

      const targetFontObj = { family: fontFamily, style: fontStyle };

      await figma.loadFontAsync(targetFontObj);
      textNode.fontName = targetFontObj;
    }
  });
}

function addSelectedLayersFontsToFontMapping(textNodes) {
  fontMapping = {};
  textNodes.forEach((textNode) => {
    if (!textNode.fontName.family || !textNode.fontName.style) return;
    const key =
      textNode.fontName.family +
      " - " +
      normalizeStyle(textNode.fontName.style);
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

function normalizeStyle(input: string) {
  // Remove spaces
  const step1 = input.replace(/\s/g, "");

  // Add spaces on Capital case
  const step2 = step1.replace(/([a-z])([A-Z])/g, "$1 $2");

  // Capitalize the first letter of each word
  const step3 = step2.replace(/\b\w/g, (match) => match.toUpperCase());

  return step3;
}

function normalizeAllUsersFontStyles(allUserFonts) {
  return allUserFonts.map((font) => {
    return {
      fontName: {
        family: font.fontName.family,
        style: normalizeStyle(font.fontName.style),
      },
    };
  });
}
