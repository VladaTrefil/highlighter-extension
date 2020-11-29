const queryNodeData = (nodeData, selOffset) => {
  const nodes = nodeData
    .map(({ query, content }, index) => {
      const node = document.body.querySelector(query)
      const textNodes = Object.values(node.childNodes)

      const targetTextNode = textNodes.filter((textNode) => {
        if (textNode.nodeType === Node.TEXT_NODE && textNode.textContent.includes(content)) {
          return textNode
        } else {
          return false
        }
      })

      const offset = setNodeOffset(index, selOffset, nodeData.length)

      if (targetTextNode.length > 0) {
        return {
          node: targetTextNode[0],
          content,
          offset,
        }
      } else {
        return false
      }
    })
    .filter((node) => node)

  return nodes
}

function setNodeOffset(index, offset, length) {
  let start = 0
  let end = 0

  if (length === 1) {
    start = offset.start
    end = offset.end
  } else if (index === 0) {
    start = offset.start
  } else if (index === length - 1) {
    end = offset.end
  }

  return { start, end }
}
