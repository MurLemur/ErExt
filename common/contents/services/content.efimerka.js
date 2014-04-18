// ==UserScript==
// @name     ErExt_Efimerka
// @include	 	http://www.ereality.ru/core/*
// @require 	tools/jquery.js
// @require 	tools.js
// @include 	http://*.com/efimerka/
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
		$("#sdiv_img8").click();
		
		setTimeout(function() {
			var name = location.href.replace(new RegExp("(.+)/efimerka/#(.+)", "g"), "$2");
			$("#getsetid").val(name).parent().find("input[value=\"Загрузить\"]").click();
		}, 5000);	
	});
});