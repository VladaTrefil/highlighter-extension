const getNodeIndex = (node) => {
  const skipNodes = [Node.TEXT_NODE, Node.COMMENT_NODE]
  let count = 0

  while (true) {
    if (skipNodes.indexOf(node.nodeType) === -1) {
      count++
    }

    node = node.previousSibling

    if (node === null) {
      break
    }
  }

  return count
}

const getNodeClassSelector = (node) => {
  if (node.classList.length > 0) {
    const classes = Object.values(node.classList)
      .map((className) => {
        if (className.length > 0 && className.indexOf(':') === -1) {
          return '.' + className // change to actual regex
        } else {
          return false
        }
      })
      .filter((className) => className)

    return classes.join('')
  } else {
    return ''
  }
}

const getNodeSelector = (node) => {
  const nodeName = node.nodeName.toLowerCase()
  const nodeID = node.id !== '' ? '#' + node.id : ''
  const nodeClass = getNodeClassSelector(node)
  const nodeIndex = `:nth-child(${getNodeIndex(node)})`

  const selector = nodeName + nodeIndex + nodeID + nodeClass

  return selector
}

const getParsedSelection = (nodes, anchor) => {
  return nodes.map(({ node, text }) => {
    const hierarchy = []
    let parentNode = node.parentNode

    const documentBody = window.document.body
    while (parentNode !== documentBody) {
      const nodeSelector = getNodeSelector(parentNode)

      hierarchy.push(nodeSelector)
      parentNode = parentNode.parentNode

      if (parentNode.id === anchor) {
        break
      }
    }

    const path = hierarchy.reverse().join('>')
    return { content: text, path }
  })
}
