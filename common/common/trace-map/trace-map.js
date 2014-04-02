var traceMapClass = function(css) {
	this.css = css;
	this.isEnable = false;
	var self = this;

	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.traceImgOff + "\">").on('click', function() {
			self.onPress($(this));
		});

		return $("<a title=\"След\"></a>").append(img).css(this.css.link);
	};

	this.onPress = function(traceImg) {
		if (self.isEnable) {
			self.isEnable = false;
			traceImg.attr("src", self.css.traceImgOff);
		} else {
			self.isEnable = true;
			traceImg.attr("src", self.css.traceImgOn);
		}

	}


	this.init = function() {
		$("#div_users a#span_sort").parent().prepend(this.buildLink());
	}
}
			
