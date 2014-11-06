// ==UserScript==
// @name     ErExt_ErBattleLogs
// @include http://www.ereality.ru/log/#id*
// @require tools/jquery.js
// @require tools.js
//
// ==/UserScript==
		
function controller(extOptions) {		
	if (!extOptions.options.unpaused) {
		return;
	}
	
	var link = 'http://freedom.erclan.ru/analiz/' + location.href.replace("http://www.ereality.ru/log/", "");	
	var button = $('<a href="' + link + '" target="_blank"></a>')
		.append($('<img src="' + kango.io.getResourceUrl('res/battle_analysis.gif') + '" title="Анализ боя от Freedom">'));
		
	$("#html").before(button);
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"} 
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});