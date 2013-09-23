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
	if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1)) {
		document.getElementById("one_getsetid").setAttribute('value',document.referrer.replace("http://www.ereality.ru/~","").replace("http://www.ereality.ru/",""));
		tools.xpath("/html/body/div[7]/div[22]/table/tbody/tr[3]/td/input[2]").snapshotItem(0).click();
	}
}