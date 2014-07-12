var globalEventsClickableNamesClass = function(selector) {
	this.selector = selector;
	
	var self = this;
	
	this.init = function() {
		self.makeClicable();
	};
	
	this.makeClicable = function() {
		$(self.selector).each(function() {
			var currentElement = $(this);
			
			var name = $.trim(currentElement.text());
			var html = currentElement.html().replace(name, '<a target="_blank" href="http://www.ereality.ru/~' + name +'">' + name + '</a>');

			currentElement.html(html); 
		});
	}
}