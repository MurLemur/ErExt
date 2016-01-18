var itemsBuilderClass = function(builderCss) {
	this.builderCss = builderCss;
	this.imgStore = "https://img.ereality.ru/34x-/w/";
	this.itemsHolder = $("<table></table>");
	
	var self = this;
	
	this.build = function(items) {
		this.itemsHolder.children().remove();
		
		var tr = $("<tr></tr>");
		this.itemsHolder.append(tr);
		
		if (items.length == 0) {
			tr.append(this.buildEmptyItems());
			return this.itemsHolder;
		}		
		
		$.each(items, function(index) {
			var item = self.buildItem(this);
			
			var td = $("<td></td>").css(self.builderCss.td);
			td.append(item.img).append(item.text)
			
			tr.append(td);
		});
		
		return this.itemsHolder;
	};
	
	this.buildEmptyItems = function() {
		return $("<td><img src=\"" + kango.io.getResourceUrl("res/no_items.gif") + "\"></td>");
	};
	
	this.buildItem = function(item) {
		var img  = $('<img src="' + this.imgStore + item.w_image + '"/>').css(this.builderCss.img);
		var imgDiv = $('<div></div>').css(this.builderCss.imgDiv).append(img);
		
		var textDiv = $('<div></div>').css(this.builderCss.textDiv).append(item.w_name + ' ' + item.w_cursolid  + '/' + item.w_maxsolid);	
		
		return {img: imgDiv, text: textDiv};

	};
}

var itemsBuilder = new itemsBuilderClass(itemsBuilderCss);