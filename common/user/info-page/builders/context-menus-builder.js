var ContexMenusBuilderClass = function(ContextMenus) {
	var self = this;
	var html = '';
	var script = '';
	this.init = function() {

		$.each(ContextMenus, function(key, menu) {
			script += '$("img[src*=' + menu["target"] + ']").contextMenu("' + menu["menuname"] + '",{});'
			html += '' +
				'<div class="contextMenu" id="' + menu["menuname"] + '" style="visibility: hidden;position:absolute;">' +
				'<ul class="textM">'
			$.each(menu["menuitems"], function(id, item) {
				html += '' +
					'<li><a href="' + item["itemlink"] + '" target="_blank"><img src="' + item["itemimg"] + '">' + item["itemdescription"] + '</a></li>'
			});
			html += '' +
				'</ul>' +
				'</div>'
		});

		document.body.lastChild.insertAdjacentHTML("afterEnd", html);
		var scr = document.createElement("script");
		scr.text = script;
		document.body.appendChild(scr);

	}
}