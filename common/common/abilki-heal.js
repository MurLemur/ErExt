var abilHealClass = function(css, holder) {
	this.css = css;
	var self = this;

	this.buildLink = function() {
		var img = $("<img src=\"" + this.css.abilHealImg + "\">");
		return $("<a title=\"Восстановление за абилки\"></a>").append(img).css(this.css.link);
	};
	this.init = function() {
		holder.parent().prepend(this.buildLink());
	}
}
			
