const parseNodeData = (nodes, offset, rootID) => {
  return nodes.map((node, index) => {
    const query = getNodeQuery(node, rootID)
    const content = getNodeContent(node, offset, index, nodes.length)
    console.log(content)

    return { query, content }
  })
}

function getNodeContent(node, offset, index, length) {
  let text = node.textContent

  console.log(offset, length, index)
  if (length === 1) {
    text = text.slice(offset.start, offset.end)
  } else if (index === 0) {
    text = text.slice(offset.start)
  } else if (index === length - 1) {
    text = text.slice(0, offset.end)
  }

  return text
}

function getNodeQuery(node, rootID) {
  const hierarchy = []
  let parentNode = node.parentNode
  console.log(node, parentNode)

  const documentBody = window.document.body
  while (parentNode !== documentBody) {
    const nodeSelector = getNodeSelector(parentNode)
    hierarchy.push(nodeSelector)

    if (parentNode.id === rootID) {
      break
    } else {
      parentNode = parentNode.parentNode
    }
  }

  return hierarchy.reverse().join('>')
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
