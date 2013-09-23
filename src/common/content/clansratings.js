// ==UserScript==
// @name	ErExt_clans_ratings
// @include	http://sidzoku.ru/landlord*
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

container.init({
	'clan_info' : { func: additionalClanInfoLink }
});

options.load(function(options){
	container.load(options);
});

function additionalClanInfoLink () {
	for(var i = 0; i < document.images.length; ++i) {
		if (document.images[i].src.indexOf('http://img.ereality.ru/clan/') == 0) {
			var id = document.images[i].src.replace("http://img.ereality.ru/clan/","").replace(".gif","");
			var clanlink = document.createElement('A');
			clanlink.href = 'http://www.news.ereality.ru/index.php?do=static&page=sostav&id='+id;
			clanlink.target = '_blank'
			clanlink.innerHTML = '<img src="http://img.ereality.ru/inf.gif"</img>';
			document.images[i].parentNode.insertBefore(clanlink,document.images[i]);
			i++;
		}
	}
}