const highlightButton = document.getElementById('highlightButton')

highlightButton.addEventListener('click', (event) => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { key: 'getSelection' })
  })
})
