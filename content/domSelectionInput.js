const getDomSelectionInput = (nodeData) => {
  const nodes = nodeData
    .map(({ query, content, offset }) => {
      const node = document.body.querySelector(query)
      const textNodes = Object.values(node.childNodes)

      const targetTextNode = textNodes.filter((textNode) => {
        if (textNode.nodeType === Node.TEXT_NODE && textNode.textContent.includes(content)) {
          return textNode
        } else {
          return false
        }
      })
      console.log(offset)

      if (targetTextNode.length > 0) {
        return {
          node: targetTextNode[0],
          content: content,
          offset,
        }
      } else {
        return false
      }
    })
    .filter((node) => node)

  return nodes
}
