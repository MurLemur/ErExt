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
	if (/http:\/\/www.ereality.ru\/((info\d+)|(~.+))/.test(document.referrer)) {
		tools.pushJs(function(){
			setTimeout(loadHero, 1000);


			function loadHero () {
				if (!initialized_q) {
					setTimeout(loadHero, 1000);
				}

				var heroId = document.referrer.match(/^http:\/\/www\.ereality\.ru\/~?(.+)/);

				if (heroId) {
					$('#getsetid').val(heroId[1]);
					clickload();
				}
			}
		});
	}
}