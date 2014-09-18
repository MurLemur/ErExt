var soundsClass = function(css, holder) {
	this.css = css;
	this.soundsStatus = true;
	var self = this;

	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.soundsImgOn + "\">").on('click', function() {
			self.sounds($(this));
		});

		return $("<a title=\"Выкл/вкл звуков\"></a>").append(img).css(this.css.link);
	};

	this.sounds = function(soundsImg) {
		if (self.soundsStatus) {
			self.soundsStatus = false;
			soundsImg.attr("src", self.css.soundsImgOff);
		} else {
			self.soundsStatus = true;
			soundsImg.attr("src", self.css.soundsImgOn);
		}
		localStorage['soundsStatus'] = self.soundsStatus;
	};

	this.init = function() {
		holder.parent().prepend(this.buildLink());
		if (localStorage['soundsStatus'] == 'false') this.sounds($("img[src*=sound-o]"));
	}
}
			
