// bug https://www.bbc.com/news/world-middle-east-55111064

const styleManager = new StyleManager(chrome)
styleManager.init()

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    // Selecting
    const { nodes, text, offset, rootID } = getSelectionData()
    const nodeData = parseNodeData(nodes, offset, rootID)

    // // Highlighting
    const selectedNodes = queryNodeData(nodeData, offset)
    const highlight = createHighlight(selectedNodes, styleManager.getClass('MARK_NODE'))
    console.log(highlight)

    // chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selectionOutput) })
  }
})
