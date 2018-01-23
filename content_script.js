chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	console.log("onRequest:", request.method);
    if (request.method == "getSelection")
      sendResponse({data: window.getSelection().toString()});
});