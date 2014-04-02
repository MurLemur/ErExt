var contextBlockerClass = function(css) {
	this.css = css;
	this.blockStatus = false;
	var self = this;	
	
	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.blockImgOff + "\">").on('click', function() {
			self.blockContext($(this));
		});
	
		return $("<a title=\"Блокировка контекстного меню\"></a>").append(img).css(this.css.link);
	};
	
	this.blockContext = function(blockImg) {
		if (self.blockStatus) {
			self.blockStatus = false;
			blockImg.attr("src", self.css.blockImgOff);
			
			window.oncontextmenu = function(){return true};					
		} else {
			self.blockStatus = true;
			blockImg.attr("src", self.css.blockImgOn);
			
			window.oncontextmenu = function(){return false};
		}
	};
	
	this.init = function() {
		$("#div_users a#span_sort").parent().prepend(this.buildLink());
	}
	
}		
			
