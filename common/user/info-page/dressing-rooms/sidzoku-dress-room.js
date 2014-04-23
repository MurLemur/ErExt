var sidzokuDressRoomClass = function(holder, buttonStyle, userName) {
	this.holder = holder;
	this.buttonStyle = buttonStyle;
	this.bodLink = $("<a target=\"_blank\" href=\"http://www.ereality.ru/goto/sidzoku.ru/armory#" + userName + "\" title=\"Переодевалка от Sidzoku\"></a>");
	this.bodImg = $("<img src=\"" + kango.io.getResourceUrl("res/sidzoku.gif") + "\">");
		
	var self = this;
	this.init = function() {
		self.bodImg.css(self.buttonStyle);
		self.bodLink.append(self.bodImg);
		self.holder.append(self.bodLink);
	}
}