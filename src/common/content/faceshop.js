// ==UserScript==
// @name	ErExt_core
// @include	http://yo-bod.com/faceshop/
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==


container.init({
	'faceshop' : { func: loadHeroInfoByReferrer }
});

options.load(function(options){
	container.load(options);
});

/**
 * Загружает персонажа в переодевалку BoD (того из чьей информации выполнен переход на переодевалку)
 */
function loadHeroInfoByReferrer () {
	var heroId = document.referrer.match(/^http:\/\/www\.ereality\.ru\/~?(.+)/);

	if (heroId) {
		document.getElementById("one_getsetid").setAttribute(
			'value',
			heroId[1]
		);
		tools.xpath("/html/body/div[7]/div[22]/table/tbody/tr[3]/td/input[2]").snapshotItem(0).click();
	} else {
		kango.console.log('ErExt load: false');
		kango.console.log('Referrer: ' + document.referrer);
	}
}