// ==UserScript==
// @name	ErExt_core
// @include	http://xn--n1aoy.com/efimerka*
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==


container.init({
	'efimerka' : { func: loadHeroInfoByReferrer }
});

options.load(function(options){
	container.load(options);
});

/**
 * Загружает персонажа в эфимерку (того из чьей информации выполнен переход на переодевалку)
 */
function loadHeroInfoByReferrer () {
	if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
	{
		tools.xpath('//*[@id="sdiv_img8"]').snapshotItem(0).click();
		window.onload = setTimeout(function(){
			document.getElementById("getsetid").setAttribute('value', document.referrer.replace("http://www.ereality.ru/~","").replace("http://www.ereality.ru/",""));
			var xpathRes1 = tools.xpath("/html/body/table/tbody/tr/td[4]/div/div[4]/table/tbody/tr[6]/td/form/input[2]");
			xpathRes1.snapshotItem(0).click();
		}, 5000);
	}
}