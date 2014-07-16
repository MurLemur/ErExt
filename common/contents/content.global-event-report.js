// ==UserScript==
// @name     ErExt_Global_Events_Report
// @include http://www.ereality.ru/event/global/*
// @require tools/jquery.js
// @require tools.js
//
// @require common/gobal-events/global-events-reports-names.js
// ==/UserScript==
		
function controller(extOptions) {		
	if (!extOptions.options.unpaused) {
		return;
	}
	
	// init clickable names
	if (extOptions.options.clickbaleNamesInGlobalEventReports) {
		var globalEventsClickableNames = new globalEventsClickableNamesClass("tr[class$='winner'] td:first-child");
		globalEventsClickableNames.init();
	}
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"} 
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});