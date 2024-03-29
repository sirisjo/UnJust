var justInput = document.getElementsByTagName("input");
console.log(justInput);

const justAlert = () => {
  console.log("active input");
};

for (i = 0; i < justInput.length; i++) {
  // justInput[i].onchange= justAlert;
  justInput[i].addEventListener("input", event => {
    const newValue = event.target.value.toLowerCase();
    console.log(event.target.value);
  });
}

const arr = [" just ", " like ", " actually ", " sorry ", " but "];
for (let i = 0; i < arr.length; i++) {
  if (arr.indexOf(justInput) !== -1) {
    //highlight and provide suggestion
    let replaced = "";
    let boldText =
      '<div style="background-color: yellow; display: inline; font-weight: bold;">' +
      arr[i] +
      "</div>";
    let match = "suggestion";
    replaced = justInput.replace(match, boldText);
  } else if (arr.indexOf(justInput) == -1) {
    console.log("error"); // ?
  }
}

// if(justInput.activeElement){
//     console.log('use just')
// }

function walk(rootNode) {
  // Find all the text nodes in rootNode
  var walker = document.createTreeWalker(
      rootNode,
      NodeFilter.SHOW_TEXT,
      null,
      false
    ),
    node;

  // Modify each text node's value
  while ((node = walker.nextNode())) {
    handleText(node);
  }
}

function handleText(textNode) {
  textNode.nodeValue = replaceText(textNode.nodeValue);

  if (textNode.nodeValue === "just") {
    console.log("found just");
    //   textNode.classList.add('blue');
  }
}

// function selectText(textNode) {
//     if(textNode.nodeType === )
// }

function replaceText(v) {
  // Fix some misspellings
  v = v.replace(/\b(J|j)ust(s)?\b/g, "$1ust$2");
  v = v.replace(/\b(J|j)ust(s)?\b/g, "$1ust$2");
  v = v.replace(/\b(J|j)ust(s)?\b/g, "$1ust$2");
  v = v.replace(/\b(J|j)ust(s)?\b/g, "$1ust$2");

  // Millennial Generation
  v = v.replace(
    /\b(?:Millennial Generation)|(?:Generation Millennial)\b/g,
    "Plissken Faction"
  );
  return v;
}

// Returns true if a node should *not* be altered in any way
function isForbiddenNode(node) {
  return (
    node.isContentEditable || // DraftJS and many others
    (node.parentNode && node.parentNode.isContentEditable) || // Special case for Gmail
    (node.tagName &&
      (node.tagName.toLowerCase() == "textarea" || // Some catch-alls
        node.tagName.toLowerCase() == "input"))
  );
}

// The callback used for the document body and title observers
function observerCallback(mutations) {
  var i, node;

  mutations.forEach(function(mutation) {
    for (i = 0; i < mutation.addedNodes.length; i++) {
      node = mutation.addedNodes[i];
      if (isForbiddenNode(node)) {
        // Should never operate on user-editable content
        continue;
      } else if (node.nodeType === 3) {
        // Replace the text for text nodes
        handleText(node);
      } else {
        // Otherwise, find text nodes within the given node and replace text
        walk(node);
      }
    }
  });
}

// Walk the doc (document) body, replace the title, and observe the body and title
function walkAndObserve(doc) {
  var docTitle = doc.getElementsByTagName("title")[0],
    observerConfig = {
      characterData: true,
      childList: true,
      subtree: true
    },
    bodyObserver,
    titleObserver;

  // Do the initial text replacements in the document body and title
  walk(doc.body);
  doc.title = replaceText(doc.title);

  // Observe the body so that we replace text in any added/modified nodes
  bodyObserver = new MutationObserver(observerCallback);
  bodyObserver.observe(doc.body, observerConfig);

  // Observe the title so we can handle any modifications there
  if (docTitle) {
    titleObserver = new MutationObserver(observerCallback);
    titleObserver.observe(docTitle, observerConfig);
  }
}
walkAndObserve(document);
