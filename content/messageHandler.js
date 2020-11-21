chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const { nodes, anchor } = getDomSelectionOutput()
    const nodeData = getParsedSelection(nodes, anchor)

    const selectedNodes = getDomSelectionInput(nodeData, anchor)

    const highlight = createHighlight(selectedNodes, anchor)

    console.log(highlight)

    // chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selectionOutput) })
  }
})
