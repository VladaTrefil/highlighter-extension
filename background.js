chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(request)
  if (request.key === 'setSelection') {
    console.log(request)
  }
})

chrome.commands.onCommand.addListener((command) => {
  if (command === 'highlightText') {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { key: 'getSelection' })
    })
  }
})
