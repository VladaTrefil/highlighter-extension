const getCommonParent = (anchorNode, focusNode) => {
  anchorNode = anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentNode : anchorNode
  focusNode = focusNode.nodeType === Node.TEXT_NODE ? focusNode.parentNode : focusNode

  let parentNode = focusNode.parentNode

  while (!anchorNode.closest(parentNode.nodeName)) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}

const getOffset = (selection, isAnchorStart) => ({
  start: isAnchorStart ? selection.anchorOffset : selection.focusOffset,
  end: !isAnchorStart ? selection.anchorOffset : selection.focusOffset,
})

const getBoundaries = (bounds, rootNodes) => {
  const start = { index: null, node: null }
  const end = { index: null, node: null }
  let endIndex = null

  rootNodes.forEach((node, index) => {
    bounds.forEach((boundary) => {
      if (node.contains(boundary)) {
        if (start.index === null) {
          start.index = index
          start.element = boundary
        } else {
          end.index = index
          end.element = boundary
        }
      }
    })
  })

  return { start, end }
}

const getRootNodesInBounds = (startIndex, endIndex, rootNodes) => {
  const range = rootNodes.filter((node, index) => {
    if (index >= startIndex && index <= endIndex) {
      return node
    } else {
      return false
    }
  })

  return range
}

const getSelectedNodes = (nodes, fullText, offset) => {
  return nodes.filter((node, index) => {
    const nodeText = node.textContent
    let partText = ''

    if (index === 0) {
      partText = nodeText.slice(offset.start)
    } else if (index === nodes.length) {
      partText = nodeText.slice(0, offset.end)
    } else {
      partText = nodeText
    }

    if (fullText.includes(partText)) {
      return { node, text: partText }
    } else {
      return false
    }
  })
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

const getMatchingNodes = (nodes, fullText, offset) => {
  return nodes.filter((node, index) => {
    const nodeText = node.textContent
    let partText = ''

    if (index === 0) {
      partText = nodeText.slice(offset.start)
    } else if (index === nodes.length) {
      partText = nodeText.slice(0, offset.end)
    } else {
      partText = nodeText
    }

    if (fullText.includes(partText)) {
      return { node, text: partText }
    } else {
      return false
    }
  })
}

const parseSelectedNodes = () => {
  let text = ''

  if (window.getSelection) {
    const selection = window.getSelection()

    text = selection.toString()

    const anchorNode = selection.anchorNode
    const focusNode = selection.focusNode

    const parentNode = getCommonParent(anchorNode, focusNode)
    const rootNodes = Object.values(parentNode.childNodes)
    const { start, end } = getBoundaries([anchorNode, focusNode], rootNodes)

    const selectedRootNodes = getRootNodesInBounds(start.index, end.index, rootNodes)

    if (rootNodes.length > 0) {
      const isAnchorStart = rootNodes[0].contains(anchorNode)
      const offset = getOffset(selection, isAnchorStart)

      const textNodes = getTextNodes(selectedRootNodes)
      const textNodes = getTextNodes(selectedNodes)

      const matchingNodes = getMatchingNodes(textNodes, text, offset)

      return matchingNodes
    }
  }

  return false
}

const getDomSelectionOutput = () => {
  return parseSelectedNodes()
}