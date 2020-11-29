const getSelectionData = () => {
  const selection = window.getSelection()
  const anchor = { node: selection.anchorNode, offset: selection.anchorOffset }
  const focus = { node: selection.focusNode, offset: selection.focusOffset }
  const text = selection.toString()

  const { nodes, rootID } = getSelectedDOM(anchor.node, focus.node)

  let isAnchorStart = true
  if (anchor.node !== focus.node) {
    isAnchorStart = nodes[0].contains(anchor.node)
  } else {
    isAnchorStart = anchor.node.textContent.indexOf(text) === anchor.offset
  }

  const offset = getOffset(isAnchorStart, anchor, focus)

  return { nodes, text, offset, rootID }
}

function getOffset(isAnchorStart, anchor, focus) {
  const start = isAnchorStart ? anchor.offset : focus.offset
  const end = isAnchorStart ? focus.offset : anchor.offset
  return { start, end }
}
