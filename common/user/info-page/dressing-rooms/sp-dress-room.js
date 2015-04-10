var spDressRoomClass = function(holder, buttonStyle, userName) {
	this.holder = holder;
	this.buttonStyle = buttonStyle;
	this.spLink = $("<a target=\"_blank\" href=\"http://www.ereality.ru/goto/order.ereality.ru/sp-shop/\" title=\"Переодевалка от Стражей Порядка\"></a>");
	this.spImg = $("<img src=\"http://img.ereality.ru/clan/1.gif\">");
		
	var self = this;
	this.init = function() {
		self.spImg.css(self.buttonStyle);
		self.spLink.append(self.spImg);
		self.holder.append(self.spLink);
	}
}