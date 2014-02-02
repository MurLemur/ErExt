var popupClass = function(popupCss) {
	this.mainHolder = $('<div></div>').css(popupCss);

	this.positionDeltaX = 10;
	this.positionDeltaY = 5;

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
		var positionX = x + this.positionDeltaX;
		var positionY = y + this.positionDeltaY;
		
		var outWidth = positionX + this.popupWidth - document.body.scrollWidth;
		var outHeigth = positionY + this.popupHeight - document.body.scrollHeight;
		
		if (outWidth > 0) { 
			positionX = x - this.positionDeltaX - this.popupWidth;
		}
		
		if (outHeigth > 0) {
			positionY = y - this.positionDeltaY - this.popupHeight;
		} 
		
		this.mainHolder.css({"margin-left": positionX + "px", "margin-top": positionY + "px"});
		return this;
	} 
}
	
var popup = new popupClass(popupCss);