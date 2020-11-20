const getNodeIndex = (node) => {
  let count = 0

  while (true) {
    if (node.nodeType !== Node.TEXT_NODE) {
      count++
    }

    node = node.previousSibling

    if (node === null) {
      break
    }
  }

  return count
}

const getNodeSelector = (node) => {
  const nodeName = node.nodeName.toLowerCase()
  const nodeID = node.id !== '' ? '#' + node.id : ''
  const nodeClass = node.className !== '' ? '.' + node.className.replaceAll(' ', '.') : ''
  const nodeIndex = `:nth-child(${getNodeIndex(node)})`

  const selector = nodeName + nodeIndex + nodeID + nodeClass

  return selector
}

const getParsedSelection = (nodes, anchor) => {
  return nodes.map(({ node, text }) => {
    const hierarchy = []
    let parentNode = node.parentNode

    while (parentNode.id !== anchor) {
      const nodeSelector = getNodeSelector(parentNode)

      hierarchy.push(nodeSelector)
      parentNode = parentNode.parentNode
    }

    const path = hierarchy.reverse().join('>')
    return { content: text, path }
  })
}
