const getDomSelectionInput = (nodeData, anchorID) => {
  const anchorParent = window.document.getElementById(anchorID)

  const nodes = nodeData
    .map(({ content, path }) => {
      const node = anchorParent.querySelector(path)
      const textNodes = Object.values(node.childNodes)

      const targetTextNode = textNodes.filter((textNode) => {
        if (textNode.nodeType === Node.TEXT_NODE && textNode.textContent.includes(content)) {
          return textNode
        } else {
          return false
        }
      })

      if (targetTextNode.length > 0) {
        return { node: targetTextNode[0], content: content }
      } else {
        return false
      }
    })
    .filter((node) => node)

  return nodes
}
