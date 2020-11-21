const HIGHLIGHT_CLASS = 'highlighted-tag'

const insertMark = (mark, node) => {
  const nodeText = node.textContent
  const markText = mark.textContent

  const markIndex = nodeText.indexOf(markText)
  const startText = nodeText.substr(0, markIndex)
  const endText = nodeText.substr(markIndex + markText.length)

  console.log({ startText, endText, markText, markIndex, nodeText })

  if (markIndex > 0 && markIndex + markText.length < nodeText.length - 1) {
    const endNode = document.createTextNode(endText)
    node.textContent = startText
    node.after(endNode)
    node.after(mark)
  } else if (markIndex > 0) {
    node.textContent = startText
    node.after(mark)
  } else if (markIndex < nodeText.length - 1) {
    node.textContent = endText
    node.before(mark)
  } else {
    node.after(mark)
    node.remove()
  }
}

const createHighlight = (nodes, anchor) => {
  const highlight = nodes.map(({ node, content }, index) => {
    const mark = document.createElement('mark')
    const textNode = document.createTextNode(content)

    mark.appendChild(textNode)
    mark.classList.add(HIGHLIGHT_CLASS)

    insertMark(mark, node)

    return mark
  })

  return highlight
}
