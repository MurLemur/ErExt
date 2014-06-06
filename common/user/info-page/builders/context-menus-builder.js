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
				var il=item["itemlink"];
				il=il.replace(new RegExp("http://yo-bod.com/", 'g'),"http://www.ereality.ru/goto/yo-bod.com/");
				il=il.replace(new RegExp("http://gosov.net/", 'g'),"http://www.ereality.ru/goto/gosov.net/");
				il=il.replace(new RegExp("http://sidzoku.ru/", 'g'),"http://www.ereality.ru/goto/sidzoku.ru/");
				html += '' +
					'<li><a href="' + il + '" target="_blank"><img src="' + item["itemimg"] + '">' + item["itemdescription"] + '</a></li>'
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