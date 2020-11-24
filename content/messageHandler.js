const styleManager = new StyleManager(chrome)
styleManager.init()

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    // Selecting
    const selectionData = getSelectionData()
    console.log(selectionData)
    // const { bounds, text, selectionAnchorID } = getDomSelectionOutput()
    // const nodes = getSelectedDOM(bounds)
    // const nodeData = parseNodeQuery(nodes)

    // console.log(nodeData)

    // // Highlighting
    // const selectedNodes = getDomSelectionInput(nodeData)
    // const highlight = createHighlight(selectedNodes, styleManager.getClass('MARK_NODE'))

    // chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selectionOutput) })
  }
})
