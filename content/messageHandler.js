chrome.runtime.onMessage.addListener((request, sender) => {
  if (request.key === 'getSelection') {
    const selection = getDomSelectionOutput()

    console.log(selection)

    chrome.runtime.sendMessage({ key: 'setSelection', selection: JSON.stringify(selection) })
  }
})
