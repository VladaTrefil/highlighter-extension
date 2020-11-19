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

const getRange = (bounds, parent) => {
  return Object.values(nodes).filter((node) => {
    return true
  })
}

const getRange = (anchor, focus, parent) => {
  const rootNodes = Object.values(parent.childNodes)
  let startIndex = null
  let endIndex = null
  let startOffset = null
  let endOffset = null

  rootNodes.forEach((node, index) => {
    bounds.forEach((boundary) => {
      if (node.contains(boundary.node)) {
        if (startIndex === null) {
          startIndex = index
          startOffset = boundary.offset
        } else {
          endIndex = index
          endOffset = boundary.offset
        }
      }
    })
  })

  const range = rootNodes.filter((node, index) => {
    if (index >= startIndex && index <= endIndex) {
      return node
    } else {
      return false
    }
  })

  return {
    range,
    offset: {
      start: startOffset,
      end: endOffset,
    },
  }
}

const getSelectedNodes = (nodes, text) => {
  return Object.values(nodes).filter((node, index) => {
    if (index === 0) {
    }

    if (text.includes(node.textContent)) {
      return node
    } else {
      return false
    }
  })
}

const getSelection = () => {
  let text = ''

  if (window.getSelection) {
    const selection = window.getSelection()

    text = selection.toString()

    const anchor = { node: selection.anchorNode, offset: selection.anchorOffset }
    const focus = { node: selection.focusNode, offset: selection.focusOffset }

    const parentNode = getCommonParent(anchor.node, focus.node)
    const { range, offset } = getRange([anchor, focus], parentNode)
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
