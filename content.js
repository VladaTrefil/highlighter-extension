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

const getRootNodes = (bounds, parent) => {
  const rootNodes = Object.values(parent.childNodes)
  let startIndex = null
  let endIndex = null

  rootNodes.forEach((node, index) => {
    bounds.forEach((boundary) => {
      if (node.contains(boundary)) {
        if (startIndex === null) {
          startIndex = index
        } else {
          endIndex = index
        }
      }
    })
  })

  const range = rootNodes.filter((node, index) => {
    if (index >= startIndex && index <= endIndex) {
      console.log(node.childNodes)
      return node
    } else {
      return false
    }
  })

  return range
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

const getOffset = (selection, isAnchorStart) => ({
  start: isAnchorStart ? selection.anchorOffset : selection.focusOffset,
  end: !isAnchorStart ? selection.anchorOffset : selection.focusOffset,
})

const getSelection = () => {
  let text = ''

  if (window.getSelection) {
    const selection = window.getSelection()

    text = selection.toString()

    const anchorNode = selection.anchorNode
    const focusNode = selection.focusNode

    const parentNode = getCommonParent(anchorNode, focusNode)
    const rootNodes = getRootNodes([anchorNode, focusNode], parentNode)

    if (rootNodes.length > 0) {
      const isAnchorStart = rootNodes[0].contains(anchorNode)
      const offset = getOffset(selection, isAnchorStart)
      const textNodes = getTextNodes(rootNodes)
      const selectedNodes = getSelectedNodes(textNodes, text, offset)

      return selectedNodes
    }
  }

  return false
}

chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const selection = getSelection()
    chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selection) })
  }
})
