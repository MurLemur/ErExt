// ==UserScript==
// @name     ErExt_SidzokuService
// @require 	tools/jquery.js
// @require 	tools.js
// @include     http://sidzoku.ru/landlord/
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
		var heroName = location.href.replace("http://sidzoku.ru/landlord/#", "");
		$("#heroName").val(heroName).parent().find("img[src=\"img/btn_search_char.png\"]").click();
	});
});