// ==UserScript==
// @name	ErExt_sidzoku_landlord
// @include	http://ratings.ereality.ru/clans*
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

container.init({
	'sidzoku' : { func: checkReferrer }
});

options.load(function(options){
	container.load(options);
});

function checkReferrer () {
	if ((document.referrer.search("http://www.ereality.ru/info") != -1) || (document.referrer.search("http://www.ereality.ru/~") != -1))
	{
		document.getElementById("heroName").setAttribute('value',location.href.replace("http://sidzoku.ru/landlord/#",""));
		var xpathRes = xpath("/html/body/div[5]/div[5]/div/div[3]/div/img[2]");
		xpathRes.snapshotItem(0).click();
	}
}