const parseNodeQuery = (nodes, anchor) => {
  return nodes.map((nodeData) => {
    const query = getNodeQuery(nodeData.node, anchor)
    const content = nodeData.content
    const offset = nodeData.offset

    return { query, content, offset }
  })
}

function getNodeIndex(node) {
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

function getNodeClassSelector(node) {
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

function getNodeSelector(node) {
  const nodeName = node.nodeName.toLowerCase()
  const nodeID = node.id !== '' ? '#' + node.id : ''
  const nodeClass = getNodeClassSelector(node)
  const nodeIndex = `:nth-child(${getNodeIndex(node)})`

  const selector = nodeName + nodeIndex + nodeID + nodeClass

  return selector
}

function getNodeQuery(node, anchor) {
  const hierarchy = []
  let parentNode = node.parentNode

  const documentBody = window.document.body
  while (parentNode !== documentBody) {
    const nodeSelector = getNodeSelector(parentNode)
    hierarchy.push(nodeSelector)

    if (parentNode.id === anchor) {
      break
    } else {
      parentNode = parentNode.parentNode
    }
  }

  return hierarchy.reverse().join('>')
}
