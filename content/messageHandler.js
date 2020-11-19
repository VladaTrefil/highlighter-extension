chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const selection = parseSelectedNodes()

    chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selection) })
  }
})
