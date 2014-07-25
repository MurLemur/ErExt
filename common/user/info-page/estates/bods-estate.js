var bodsEstateClass = function() {
	this.bodEstateLink = $("<a title=\"Просмотр поместья от СП\" target=\"_blank\"></a>");
	this.bodeEstateImg = $("<img src=\"" + kango.io.getResourceUrl("res/yo-bods-search.png") + "\">");
	var self = this;
	
	this.init = function(userName, estateHolder) {		
		self.bodEstateLink.attr("href", 'http://order.ereality.ru/viewpage.php?page_id=43&name=' + CP1251urlencode(userName)).append(self.bodeEstateImg);
		estateHolder.append(self.bodEstateLink);
	}
}
