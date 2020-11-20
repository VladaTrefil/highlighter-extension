const getNodeSelector = (node) => {
  const nodeName = node.nodeName.toLowerCase()
  const nodeID = node.id !== '' ? '#' + node.id : ''
  const nodeClass = node.className !== '' ? '.' + node.className.replaceAll(' ', '.') : ''

  const selector = nodeName + nodeID + nodeClass

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

    return { content: text, path: hierarchy }
  })
}
