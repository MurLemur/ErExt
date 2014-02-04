var itemsBuilder = function(builderCss) {
	this.builderCss = builderCss;
}

itemsBuilder.prototype = {
	imgStore: "http://img.ereality.ru/34x-/w/",
	build: function(items) {
		if (items.length == 0) {
			return null;
		}
	
		var self = this;
	
		var itemsHolder = $("<table></table>");
		
		var tr = $("<tr></tr>");
		itemsHolder.append(tr);
		
		$.each(items, function(index) {
			var item = self.buildItem(this);
			
			var td = $("<td></td>").css(self.builderCss.td);
			td.append(item.img).append(item.text)
			
			tr.append(td);
		});
		
		return itemsHolder;
	},
	buildItem: function(item) {
		var img  = $('<img src="' + this.imgStore + item.w_image + '"/>').css(this.builderCss.img);
		var imgDiv = $('<div></div>').css(this.builderCss.imgDiv).append(img);
		
		var textDiv = $('<div></div>').css(this.builderCss.textDiv).append(item.w_name + ' ' + item.w_cursolid  + '/' + item.w_maxsolid);	
		
		return {img: imgDiv, text: textDiv};

	}
}

var itemsBuilder = new itemsBuilder(itemsBuilderCss);