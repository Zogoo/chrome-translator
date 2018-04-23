function update_selected(msg) {
  document.getElementById("selected").innerHTML = msg;
}

function update_translated(msg) {
  document.getElementById("translate").innerHTML = msg;
}

function GetValueofField(fieldName) {
  return document.getElementById(fieldName).value;
}

document.addEventListener('DOMContentLoaded', function() {
  var clickme = document.getElementById('search');
  // onClick's logic below:
  clickme.addEventListener("click", function(e) {
    update_selected("Please enter word");
    update_translated("...");
    chrome.runtime.sendMessage({
      code: 'find-from-popup',
      selected: GetValueofField("selected")
    }, function(result) {
      // Asynchronous result doesn't come directly
      // debugger;
      // update_selected(result.name);
      // update_translated(result.species);
    });
  });
});

// Asynchronous result handler
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type == 'result-for-popup') {
    update_selected(request.name);
    update_translated(request.species);
  }
});
