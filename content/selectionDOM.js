const getSelectedDOM = (anchor, focus, parent) => {
  let nodes = Object.values(parent.childNodes)
  const { start, end } = getBoundaries([anchor, focus], nodes)

  nodes = getNodesInBounds(nodes, start.rootNode, end.rootNode)
  nodes = getTextNodes(nodes)
  nodes = getNodesInBounds(nodes, start.node, end.node)

  return nodes
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
