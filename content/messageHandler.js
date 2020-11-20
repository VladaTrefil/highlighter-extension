chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const { nodes, anchor } = getDomSelectionOutput()
    const nodeData = getParsedSelection(nodes, anchor)

    const selectionInput = getDomSelectionInput(nodeData, anchor)

    console.log(selectionInput)

    // chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selectionOutput) })
  }
})
