// ==UserScript==
// @name     ErExt_sanctions
// @include www.ereality.ru/map*page=sanctions*
// @include www.ereality.ru/map*action=sanctions*
// @include www.ereality.ru/map*pid=smith2
// @require tools/jquery.js
// @require tools.js
// @all-frames  true
// ==/UserScript==
		
function controller(extOptions) {		
	if (!extOptions.options.unpaused) {
		return;
	}
	

	if (extOptions.options.sanctions) {
		top.main.$("a", "td").next().next().remove();
		top.main.$("div:first", "td").next().remove();
		top.main.$("div:first", "td").next().remove();
		top.main.$("img", "div td").attr("width", "50%");
		top.main.$("td:last", "tr").attr("width", "300");
	}
}

var loadOptions = [
	{systemName: 'options', defaultName: "myoptions"} 
];

$(document).ready(function() {
	tools.loadOptions(loadOptions, controller);
});