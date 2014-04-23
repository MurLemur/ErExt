// ==UserScript==
// @name     ErExt_SidzokuService
// @include 	http://www.ereality.ru/core/*
// @require 	tools/jquery.js
// @require 	tools.js
// @include     http://sidzoku.ru/landlord/
// @include     http://armory.sidzoku.ru/
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
		if (location.href.search("http://sidzoku.ru/landlord") != -1) {
			var heroName = location.href.replace("http://sidzoku.ru/landlord/#", "");
			$("#heroName").val(heroName).parent().find("img[src=\"img/btn_search_char.png\"]").click();
		}
		else {
			var heroName = location.href.replace("http://armory.sidzoku.ru/#", "");
			$("#find_hero_name").val(heroName).parent().find("img[src=\"img/kukla/btn_search_char.png\"]").click();
		}

	});
});