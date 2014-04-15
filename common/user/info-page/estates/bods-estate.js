var bodsEstateClass = function() {
	this.bodEstateLink = $("<a title=\"Просмотр поместья от Blade of Darkness\" target=\"_blank\"></a>");
	this.bodeEstateImg = $("<img src=\"" + kango.io.getResourceUrl("res/yo-bods-search.png") + "\">");
	var self = this;
	
	this.init = function(userName, estateHolder) {		
		self.bodEstateLink.attr("href", 'http://yo-bod.com/library/modules/estate/?name=' + CP1251urlencode(userName)).append(self.bodeEstateImg);
		estateHolder.append(self.bodEstateLink);
	}
}
