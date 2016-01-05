var presents2016Class = function(css, holder) {
	this.css = css;
	var self = this;

	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.presents2016Img + "\">");
		return $("<a id=\"mur_presents2016\"  href=\"JavaScript:PV();\" title=\"Открыватор подарков(2016)\"></a>").append(img).css(this.css.link);
	};
	this.init = function() {
		holder.parent().prepend(this.buildLink());
	}
}
			
