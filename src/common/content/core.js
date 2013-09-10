// ==UserScript==
// @name	ErExt_core
// @include	http://www.ereality.ru/core*
// @require	js/container.js
// @require	js/options.js
// @require	js/tools.js
// ==/UserScript==

container.init({
	'chatsectors': { func: chatMapSearch }
});

options.load(function(options){
	container.load(options);
});

function chatMapSearch () {
	setTimeout(function() {
		tools.pushJs(function() {
			if (typeof core.__showSector == 'function') {
				return
			}

			core.__showSector = function (x, y) {
				if (typeof main.Map == 'object') {
					main.$('#searchX').val(x);
					main.$('#searchY').val(y);
					main.Map.searchSector();
				} else {
					main._showSec(x, y);
				}
			};

			var xgdh = chat.formatSmilies;
			chat.formatSmilies = function(){
				arguments[0] = arguments[0].replace(
					/(\d{1,3})[: \-](\d{1,3})/ig,
					"<a href=\"javascript:core.__showSector($1,$2);\">$&</a>"
				);
				return xgdh.apply(chat, arguments);
			};
		});
	}, 1000);
}