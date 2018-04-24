function appendPopup(message) {
  // TODO: Work with popup
  var d = document.createElement("div");
  d.innerText = message;
  document.body.appendChild(d);
}

document.addEventListener('mouseup', function(event) {
  var sel = window.getSelection().toString();
  if (sel.length) {
    chrome.runtime.sendMessage({
      'code': 'find-for-content',
      'selected': sel,
      'title': document.title,
      'url': window.location.href
    }, function(result) {
      // Asynchronous result doesn't come directly
      // appendPopup(result.species);
    });
  }
});

chrome.runtime.sendMessage({
  'code': 'find-for-content',
  'selected': window.getSelection().toString(),
  'title': document.title,
  'url': window.location.href
}, function(result) {
  // Asynchronous result doesn't come directly
  // appendPopup(result.species);
});

// Asynchronous result handler
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'result-for-content') {
    appendPopup(request.species);
  }
});
