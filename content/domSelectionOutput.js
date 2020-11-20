// Get the common parent of anchor and focus node
const getCommonParent = (anchorNode, focusNode) => {
  anchorNode = anchorNode.nodeType === Node.TEXT_NODE ? anchorNode.parentNode : anchorNode
  focusNode = focusNode.nodeType === Node.TEXT_NODE ? focusNode.parentNode : focusNode

  let parentNode = focusNode.parentNode

  while (!anchorNode.closest(parentNode.nodeName)) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}

// Get the text offset of start and end text node
const getOffset = (selection, isAnchorStart) => ({
  start: isAnchorStart ? selection.anchorOffset : selection.focusOffset,
  end: !isAnchorStart ? selection.anchorOffset : selection.focusOffset,
})

// Get the start and end node from anchor and focus
const getBoundaries = (bounds, rootNodes) => {
  const start = { index: null, node: null }
  const end = { index: null, node: null }

  rootNodes.forEach((node, index) => {
    bounds.forEach((boundary) => {
      if (node.contains(boundary)) {
        if (start.index === null) {
          start.index = index
          start.node = boundary
        } else {
          end.index = index
          end.node = boundary
        }
      }
    })
  })

  return { start, end }
}

// Get root nodes that are between start and end node
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

// Get all text nodes from root nodes
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

// Remove text nodes that are not between start and end node
const removeNodesOutsideBounds = (nodes, startNode, endNode) => {
  const startIndex = nodes.indexOf(startNode)
  const endIndex = nodes.indexOf(endNode)

  return nodes.filter((node, index) => {
    if (index >= startIndex && index <= endIndex) {
      return node
    } else {
      return false
    }
  })
}

// Get text nodes which text content matches text selection
const getMatchingNodes = (nodes, fullText, offset) => {
  return nodes
    .map((node, index) => {
      const nodeText = node.textContent
      let partText = ''

      if (index === 0) {
        partText = nodeText.slice(offset.start)
      } else if (index === nodes.length - 1) {
        partText = nodeText.slice(0, offset.end)
        console.log(nodeText, offset.end)
      } else {
        partText = nodeText
      }

      if (fullText.includes(partText)) {
        return { node, text: partText }
      } else {
        return false
      }
    })
    .filter((node) => node)
}

// Get ID of the closest anchor element
const getAnchorID = (parent) => {
  while (parent.parentNode !== null && parent.id === '') {
    console.log(parent, parent.parentNode)
    parent = parent.parentNode
  }

  if (parent.id !== '') {
    return parent.id
  } else {
    return false
  }
}

// Get output from selection in selected nodes and text
const getDomSelectionOutput = () => {
  if (!window.getSelection) {
    return
  }

  const selection = window.getSelection()

  const text = selection.toString()

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
    const selectedNodes = removeNodesOutsideBounds(textNodes, start.node, end.node)
    const matchingNodes = getMatchingNodes(selectedNodes, text, offset)

    const anchorParentID = getAnchorID(parentNode)

    return { nodes: matchingNodes, text, anchor: anchorParentID }
  }
}
