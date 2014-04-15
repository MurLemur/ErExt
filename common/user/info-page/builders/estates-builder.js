var estatesBuilderClass = function(configOptions, userName) {
	this.options = configOptions;
	this.name = userName;
	
	this.estateLink = $("a[href*=\"/estate_info.php\"]");
	this.estatesImgHolder = $("<nobr></nobr>");
	var self = this;
	
	this.init = function() {
		self.estateLink.attr("target", "_blank");
		self.estatesImgHolder.append(self.estateLink.find("img[src*=\"estates\"]"));
		self.estateLink.html(self.estatesImgHolder);
		
		if (self.options.bodestate) {
			new bodsEstateClass().init(self.name, self.estatesImgHolder);
		}
		
		if (self.options.sidzoku) {
			new sidzokuEstateClass().init(self.name, self.estatesImgHolder);
		}
	}
}


		
		

		
