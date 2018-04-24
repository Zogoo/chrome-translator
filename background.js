chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.code == "find-from-popup" || request.code == "find-for-content") {
      // ECMA script 6, Fetch API
      // Promise
      fetch('https://learnwebcode.github.io/json-example/animals-1.json')
        .then((resp) => resp.json())
        .then(function(response) {
          console.log(response);
          return response.map(function(result) {
            if (result.name == request.selected) {
              // Synchronous result not work
              // sendResponse(result);
              // Asynchronous result
              if (request.code == "find-from-popup") {
                result_type = "result-for-popup"
                chrome.runtime.sendMessage(Object.assign({
                  type: result_type
                }, result));
              } else if (request.code == "find-from-content") {
                result_type = "result-for-content"
                chrome.tabs.sendMessage(sender.tab.id, Object.assign({
                  type: result_type
                }, result));
              }
            }
          });
        })
        .catch(function(error) {
          console.log(error);
          sendResponse({
            name: result.name,
            species: 'Sorry not found'
          });
        });
    }
  });
