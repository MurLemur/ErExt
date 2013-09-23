// ==UserScript==
// @name	ErExt_ernews
// @include	http://www.news.ereality.ru/*
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

container.init({
	'test': { func: changeClanList }
});

options.load(function(options){
	container.load(options);
});

function changeClanList () {
	var xpathRes = tools.xpath("/html/body/table/tbody/tr[2]/td/table/tbody/tr");
	xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
	xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
	xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
	xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
	xpathRes = tools.xpath("/html/body/table/tbody");
	xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).firstChild);
	xpathRes.snapshotItem(0).removeChild(xpathRes.snapshotItem(0).lastChild);
}