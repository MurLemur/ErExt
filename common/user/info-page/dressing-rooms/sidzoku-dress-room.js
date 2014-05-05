var sidzokuDressRoomClass = function(holder, buttonStyle, userName) {
	this.holder = holder;
	this.buttonStyle = buttonStyle;
	this.SidzokuLink = $("<a target=\"_blank\" href=\"http://www.ereality.ru/goto/sidzoku.ru/armory#" + userName + "\" title=\"Переодевалка от Sidzoku\"></a>");
	this.SidzokuImg = $("<img src=\"" + kango.io.getResourceUrl("res/sidzoku.gif") + "\">");
		
	var self = this;
	this.init = function() {
		self.SidzokuImg.css(self.buttonStyle);
		self.SidzokuLink.append(self.SidzokuImg);
		self.holder.append(self.SidzokuLink);
	}
}