// ==UserScript==
// @name     ErExt_Corpses_UserMonitor
// @include http://cc.erclans.ru/viewpage.php?*page_id=45*
// @require tools/jquery.js
// @require tools.js
//
// ==/UserScript==
		
function controller(extOptions) {		
	if (!extOptions.options.unpaused) {
		return;
	}

	// init corpses service
	if (document.referrer.search("http://www.ereality.ru/core/") != -1) {
		var namesString = location.href.replace("http://cc.erclans.ru/viewpage.php?page_id=45#", "").replace(/\] \[/g, ",").replace("]", "").replace("[", "");

		$("#0012e4f").val(namesString);
		$("input[value='мониторить']")[0].click();
	}
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"} 
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});