const getSelectionData = () => {
  const selection = window.getSelection()
  const anchor = { node: selection.anchorNode, offset: selection.anchorOffset }
  const focus = { node: selection.focusNode, offset: selection.focusOffset }
  const text = selection.toString()

  let isAnchorStart = true
  let nodes = []
  let rootID

  if (anchor.node !== focus.node) {
    const parent = getCommonParent(anchor.node, focus.node)

    nodes = getSelectedDOM(anchor.node, focus.node, parent)
    isAnchorStart = nodes[0].contains(anchor.node)
    rootID = getRootID(parent)
  } else {
    nodes.push({ node: anchor.node })
    isAnchorStart = anchor.node.textContent.indexOf(text) === anchor.offset
    rootID = getRootID(anchor.node)
  }

  const offset = getOffset(isAnchorStart, anchor, focus)

  return { nodes, text, offset, rootID }
}

function getCommonParent(anchorNode, focusNode) {
  let parentNode = focusNode.nodeType === Node.TEXT_NODE ? focusNode.parentNode : focusNode

  while (!parentNode.contains(anchorNode)) {
    parentNode = parentNode.parentNode
  }

  return parentNode
}

function getOffset(isAnchorStart, anchor, focus) {
  const start = isAnchorStart ? anchor.offset : focus.offset
  const end = isAnchorStart ? focus.offset : anchor.offset
  return { start, end }
}

function getRootID(parent) {
  while (parent.parentNode && !parent.id) {
    parent = parent.parentNode
  }

  if (parent.id && parent.id !== '') {
    return parent.id
  } else {
    return false
  }
}
