var traceMapClass = function(css, holder) {
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
		localStorage['isEnableTrace'] = self.isEnable;
	}


	this.init = function() {
		holder.parent().prepend(this.buildLink());
		if (localStorage['isEnableTrace']=='true') setTimeout(function() {$("img[src*=footprint]").click();},500);
	}
}
			
