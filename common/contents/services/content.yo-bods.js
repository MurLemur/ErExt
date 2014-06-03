// ==UserScript==
// @name     ErExt_YoBodsService
// @require 	tools/jquery.js
// @require 	tools.js
// @include 	http://yo-bod.com/faceshop/
// ==/UserScript==

kango.invokeAsync('kango.storage.getItem', "options", function(options) {
	var mergedOptions = mergeOptions(options, myoptions);

	// check if plug-in on pause
	if (!mergedOptions.unpaused) {
		return;
	}
	
	if ((document.referrer.search("http://www.ereality.ru/info") == -1) && (document.referrer.search("http://www.ereality.ru/~") == -1)) {
		return;
	}
	
	$(document).ready(function() {
		var heroName = location.href.replace("http://yo-bod.com/faceshop/#", "");
		$("#one_getsetid").val(heroName).parent().find("input[value=\"Загрузить\"]").click();
	});
});