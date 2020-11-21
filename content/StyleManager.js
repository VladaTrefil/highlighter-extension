const CLASSES = {
  MARK_NODE: 'highlighted-mark-node',
}

const STYLESHEET = `
.${CLASSES.MARK_NODE} {
  background: red;
  box-shadow: 0 3px 5px rgba(0,0,0,.05);
}
`

class StyleManager {
  constructor() {
    this.head = document.head
    this.stylesheet = document.createElement('style')
  }

  init() {
    const styleText = STYLESHEET.replaceAll(' ', '')

    this.stylesheet.textContent = styleText
    this.head.appendChild(this.stylesheet)
  }

  getClass(name) {
    return CLASSES[name]
  }
}
