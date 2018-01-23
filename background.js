function translate(word) {
	var opt = {type: "basic",title: word,message: meaning(word),iconUrl: "icon.png"}
	chrome.notifications.create("notificationName",opt,function(){});
	setTimeout(function(){chrome.notifications.clear("notificationName",function(){});},5000);
}

chrome.browserAction.onClicked.addListener(function(tab) { 
	chrome.tabs.sendRequest(tab.id, {method: "getSelection"}, function(response){
		translate(response.data);
	});
});

function translateFromMenu(info, tab) {
	translate(info.selectionText);
}

chrome.commands.onCommand.addListener(function(command) {
	if (command == "command_translate") {
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendRequest(tabs[0].id, {method: "getSelection"}, function(response){
				translate(response.data);
			});
		});
	}

});

chrome.contextMenus.create({"title": 'translate "%s"', "contexts":["selection"], "onclick": translateFromMenu});