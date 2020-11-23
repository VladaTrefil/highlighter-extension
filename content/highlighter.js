const insertMark = (mark, node, offset) => {
  const nodeText = node.textContent
  const markText = mark.textContent

  const startText = nodeText.substr(0, offset.start)
  const endText = nodeText.substr(offset.end)

  if (offset.start !== 0 && offset.end !== 0) {
    const endNode = document.createTextNode(endText)
    node.textContent = startText
    node.after(endNode)
    node.after(mark)
  } else if (offset.start !== 0) {
    node.textContent = startText
    node.after(mark)
  } else if (offset.end !== 0) {
    node.textContent = endText
    node.before(mark)
  } else {
    node.after(mark)
    node.remove()
  }
}

const createHighlight = (nodes, markClass) => {
  const highlight = nodes.map(({ node, content, offset }, index) => {
    const mark = document.createElement('mark')
    const textNode = document.createTextNode(content)

    mark.appendChild(textNode)
    mark.classList.add(markClass)

    insertMark(mark, node, offset)

    return mark
  })

  return highlight
}
