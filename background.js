chrome.runtime.onMessage.addListener((request, sender) => {
  console.log(request)
  if (request.key === 'setSelection') {
    console.log(request)
  }
})
