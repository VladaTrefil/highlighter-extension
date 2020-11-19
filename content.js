const getCommonParent = (anchorNode, focusNode) => {
  anchorNode = anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentNode : anchorNode
  focusNode = focusNode.nodeType === Node.TEXT_NODE ? focusNode.parentNode : focusNode

  let parentNode = focusNode.parentNode

  while (!anchorNode.closest(parentNode.nodeName)) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}

const getTextNodes = (nodes) => {
  const selectedNodes = []

  for (const node of Object.values(nodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      selectedNodes.push(node)
    } else {
      const nodes = getTextNodes(node.childNodes)
      selectedNodes.push(...nodes)
    }
  }

  return selectedNodes
}

const getSelectedNodes = (nodes, text) => {
  return Object.values(nodes).filter((node) => {
    return true
  })
}

const getRange = (anchor, focus, parent) => {
  const rootNodes = Object.values(parent.childNodes)
  let startIndex = null
  let endIndex = null

  rootNodes.forEach((node, index) => {
    if (node.contains(anchor)) {
      if (startIndex === null) {
        startIndex = index
      } else {
        endIndex = index
      }
    }

    if (node.contains(focus)) {
      if (startIndex === null) {
        startIndex = index
      } else {
        endIndex = index
      }
    }
  })

  return rootNodes.filter((node, index) => {
    if (index >= startIndex && index <= endIndex) {
      return node
    } else {
      return false
    }
  })
}

const getSelection = () => {
  let text = ''

  if (window.getSelection) {
    text = window.getSelection().toString()

    const anchorNode = window.getSelection().anchorNode
    const focusNode = window.getSelection().focusNode

    const parentNode = getCommonParent(anchorNode, focusNode)
    const range = getRange(anchorNode, focusNode, parentNode)
    const textNodes = getTextNodes(range)
    const selectedNodes = getSelectedNodes(textNodes, text)
    console.log(textNodes)

    return selectedNodes
  }

  return false
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const selection = getSelection()
    chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selection) })
  }
})
