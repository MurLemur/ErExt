// ==UserScript==
// @name     ErExt_SpService
// @require 	tools/jquery.js
// @require 	tools.js
// @include     http://order.ereality.ru/sp-shop/*
// ==/UserScript==


kango.invokeAsync('kango.storage.getItem', "options", function(options) {
	var mergedOptions = mergeOptions(options, defaultConfig.myoptions);

	// check if plug-in on pause
	if (!mergedOptions.unpaused) {
		return;
	}

	if ((document.referrer.search("http://www.ereality.ru/info") == -1) && (document.referrer.search("http://www.ereality.ru/~") == -1)) {
		return;
	}

	$(document).ready(function() {
		setTimeout(function() {
			var heroName = location.href.replace("http://order.ereality.ru/sp-shop/#", "");
			$("#one_getsetid").val(heroName); 
			$(".upload_set_button").click();
		}, 500);		
	});
});
