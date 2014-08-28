var hideCorpsesClass = function(css, holder) {
	this.css = css;
	this.hideCorpsesStatus = false;
	var self = this;

	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.glassImgOff + "\">").on('click', function() {
			self.hideCorpses($(this));
		});

		return $("<a title=\"Только живые на ОК\"></a>").append(img).css(this.css.link);
	};

	this.hideCorpses = function(glassImg) {
		if (self.hideCorpsesStatus) {
			self.hideCorpsesStatus = false;
			glassImg.attr("src", self.css.glassImgOff);
		} else {
			self.hideCorpsesStatus = true;
			glassImg.attr("src", self.css.glassImgOn);
		}
		localStorage['hideCorpsesStatus'] = self.hideCorpsesStatus;
	};

	this.init = function() {
		holder.parent().prepend(this.buildLink());
		if (localStorage['hideCorpsesStatus'] == 'true') this.hideCorpses($("img[src*=sun-glasses]"));
	}
}
			
