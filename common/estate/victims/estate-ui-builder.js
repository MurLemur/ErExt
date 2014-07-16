var estateUiBuilderClass = function(estateVictimsListViewer, css, listImgID, anchorID) {
	this.estateVictimsListViewer = estateVictimsListViewer;
	this.css = css;
	this.listImgID = listImgID;
	this.anchor = $('#' + anchorID);
	var self = this;
	
	this.init = function() {
		self.initListImg();
		self.initDelegator();
	};
	
	this.initListImg = function() {
		var listImg = $("<img title=\"Список жертв\" id=\"" + self.listImgID + "\" class=\"estateTooltip\" src=\"" + self.css.listImg + "\">")
			.css(self.css.listImgCss);

		var listDiv = $('<div></div>').css(self.css.listDivCss).append(listImg);
		
		$('#estateTopBar').append(listDiv);	
	};
	
	this.initDelegator = function() {
		var position = null;
		var anchorWidth = self.anchor.width();
		$('body').delegate('#' + self.listImgID, 'click', function() {
			position = self.anchor.offset();

			self.estateVictimsListViewer.toggleShow(position.left + anchorWidth + 10, position.top);
		});
	}				
}