var popupClass = function(popupCss) {
	this.mainHolder = $('<div></div>').css(popupCss);

	this.positionX = 0;
	this.positionY = 0;
	
	this.outWidth = 0;
	this.outHeigth = 0;
	
	this.window = $(window);
	
	$('body').prepend(this.mainHolder);
	
	this.show = function(popupBody) {
		this.mainHolder.append(popupBody).show();
		
		this.popupWidth = this.mainHolder.width();
		this.popupHeight = this.mainHolder.height();
		
		return this;
	};
	
	this.hide = function() {
		this.mainHolder.hide().children().remove();
		return this; 
	};
	
	this.move = function(x, y, positionMarginX, positionMarginY) {
		this.positionX = x + positionMarginX;
		this.positionY = y + positionMarginY;
		
		this.outWidth = this.positionX + this.popupWidth - this.window.width();
		this.outHeigth = this.positionY + this.popupHeight - this.window.height();
		
		if (this.outWidth > 0) { 
			this.positionX = x - positionMarginX - this.popupWidth;
		}
		
		if (this.outHeigth > 0) {
			this.positionY = y - positionMarginY - this.popupHeight;
		} 
		
		this.mainHolder.css({"margin-left": this.positionX + "px", "margin-top": this.positionY + "px"});
		return this;
	} 
}
	
var popup = new popupClass(popupCss);