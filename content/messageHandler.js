chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const { nodes, anchor } = getDomSelectionOutput()
    const data = getParsedSelection(nodes, anchor)
    console.log(data)

    // const selectionInput = getDomSelectionInput(nodes, anchor)
    // chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selectionOutput) })
  }
})
