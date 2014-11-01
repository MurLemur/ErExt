// ==UserScript==
// @name     ErExt_Freedom_BattleAnalysis
// @include http://freedom.erclan.ru/analiz/*
// @require tools/jquery.js
// @require tools.js
//
// ==/UserScript==
		
function controller(extOptions) {		
	if (!extOptions.options.unpaused) {
		return;
	}

	if (document.referrer.search("http://www.ereality.ru/log") != -1) {
		var logID = location.href.replace("http://freedom.erclan.ru/analiz/", "");

		$("input[name=\"num_log\"]").val(logID);
		$('input[value="Анализировать"]')[0].click();
	}
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"} 
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});