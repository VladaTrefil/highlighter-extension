const styleManager = new StyleManager(chrome)
styleManager.init()

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    // Selecting
    const { nodes, text, anchorID } = getDomSelectionOutput()
    const nodeData = parseNodeQuery(nodes, anchorID)

    console.log(nodeData)

    // Highlighting
    const selectedNodes = getDomSelectionInput(nodeData)
    const highlight = createHighlight(selectedNodes, styleManager.getClass('MARK_NODE'))

    // chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selectionOutput) })
  }
})
