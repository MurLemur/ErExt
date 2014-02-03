var popupClass = function(popupCss) {
	this.mainHolder = $('<div></div>').css(popupCss);

	this.positionDeltaX = 10;
	this.positionDeltaY = 5;

	this.positionX = 0;
	this.positionY = 0;
	
	this.outWidth = 0;
	this.outHeigth = 0;
	
	this.window = $(window);
	
	$('body').prepend(this.mainHolder);
}

popupClass.prototype = {
	show: function(popupBody) {
		this.mainHolder.append(popupBody).show();
		
		this.popupWidth = this.mainHolder.width();
		this.popupHeight = this.mainHolder.height();
		
		return this;
	},
	hide: function() {
		this.mainHolder.hide().children().remove();
		return this;
	},	
	move: function(x, y) {
		this.positionX = x + this.positionDeltaX;
		this.positionY = y + this.positionDeltaY;
		
		this.outWidth = this.positionX + this.popupWidth - this.window.width();
		this.outHeigth = this.positionY + this.popupHeight - this.window.height();
		
		if (this.outWidth > 0) { 
			this.positionX = x - this.positionDeltaX - this.popupWidth;
		}
		
		if (this.outHeigth > 0) {
			this.positionY = y - this.positionDeltaY - this.popupHeight;
		} 
		
		this.mainHolder.css({"margin-left": this.positionX + "px", "margin-top": this.positionY + "px"});
		return this;
	} 
}
	
var popup = new popupClass(popupCss);