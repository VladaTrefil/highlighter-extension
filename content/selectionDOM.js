const getSelectedDOM = (anchor, focus, parent) => {
  let nodes = []
  let rootID = null

  if (anchor !== focus) {
    const parent = getCommonParent(anchor, focus)
    nodes = Object.values(parent.childNodes)
    const { start, end } = getBoundaries([anchor, focus], nodes)

    nodes = getNodesInBounds(nodes, start.rootNode, end.rootNode)
    nodes = getTextNodes(nodes)
    nodes = getNodesInBounds(nodes, start.node, end.node)

    rootID = getRootID(parent)
  } else {
    nodes.push(anchor)
    rootID = getRootID(anchor)
  }

  return { nodes, rootID }
}

function getCommonParent(anchorNode, focusNode) {
  let parentNode = focusNode.nodeType === Node.TEXT_NODE ? focusNode.parentNode : focusNode

  while (!parentNode.contains(anchorNode)) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}

function getBoundaries(bounds, nodes) {
  const start = { node: null, rootNode: null }
  const end = { node: null, rootNode: null }

  nodes.forEach((node, index) => {
    bounds.forEach((boundary) => {
      const containsBoundary = node.nodeType === 1 && node.contains(boundary)
      const isBoundary = node === boundary
      if (isBoundary || containsBoundary) {
        if (start.node === null) {
          start.rootNode = node
          start.node = boundary
        } else {
          end.rootNode = node
          end.node = boundary
        }
      }
    })
  })

  return { start, end }
}

function getNodesInBounds(nodes, startNode, endNode) {
  const startIndex = nodes.indexOf(startNode)
  const endIndex = nodes.indexOf(endNode)

  return nodes.filter((node, index) => index >= startIndex && index <= endIndex)
}

function getTextNodes(nodes) {
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

function getRootID(parent) {
  while (parent.parentNode && !parent.id) {
    parent = parent.parentNode
  }

  if (parent.id && parent.id !== '') {
    return parent.id
  } else {
    return false
  }
}
