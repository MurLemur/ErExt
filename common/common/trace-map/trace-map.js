var traceMapClass = function(css, holder, popup) {
	this.css = css;
	this.popup = popup;
	this.isEnable = false;
	this.view;
	this.closeButtonId = 'er-ext-close-button';
	var self = this;

	this.buildLink = function() {
		var imgSrc = self.css.traceImgOff;
		
		if (localStorage['isEnableTrace'] == 'true') {
			imgSrc = self.css.traceImgOn;
		}
	
		var img = $("<img id=\"er-ex-footstep_img\" src=\"" + imgSrc + "\">").on('mousedown', function(event) {
			if (event.which == 1) {
				self.onLeftClick($(this));
			}
			
			if (event.which == 3) { 
				self.onRigthClick($(this));
				event.preventDefault();
			}
		}).on('contextmenu', function(event) {
			return false;
		});

		return $("<a title=\"След\"></a>").append(img).css(this.css.link);
	};

	this.onLeftClick = function(traceImg) {
		if (localStorage['isEnableTrace'] == 'true') {
			traceImg.attr('src', self.css.traceImgOff);
			return;
		}
		
		traceImg.attr('src', self.css.traceImgOn);
	};
	
	this.onRigthClick = function(traceImg) {
		this.popup.show(this.view).move(this.calculatePositionX(traceImg.offset().left), this.calculatePositionY(traceImg.offset().top), 0, 0);
		this.bindListeners();
	};

	this.prepareView = function() {
		this.view = $("<table class=\"textS\" cellspacing=\"4px\"></table>").css(self.css.table);
		
		this.view.append(this.getExitButton());	
		this.view.append(this.getSaveButton());
		this.view.append(this.getAutosaveButton());		
		this.view.append(this.getClearButton());
	};
	
	this.init = function() {
		holder.parent().prepend(this.buildLink());
		this.prepareView();
	};
	
	this.calculatePositionX = function(x) {
		return x -= this.view.width();
	};
	
	this.calculatePositionY = function(y) {
		return y -= this.view.height();
	};
		
	this.bindListeners = function() {
		this.view.find("#" + this.closeButtonId).on("click", function() {
			$(this).attr("src", self.css.iconClose);
			self.hide();
		}).hover(function() {
			$(this).attr("src", self.css.iconCloseHover);
		}, function() {
			$(this).attr("src", self.css.iconClose);
		});
		
		this.view.find('span').hover(function() {
			$(this).css({'text-decoration': 'underline'});
		},
		function() {
			$(this).css({'text-decoration': 'none'});
		}); 
	};
	
	this.hide = function() {
		this.popup.hide();
		
		return this;
	};
	
	this.getExitButton = function() {
		return $("<tr><td colspan=\"2\" align=\"right\"><img id=\"" + this.closeButtonId + "\" src=\"" + self.css.iconClose + "\"></td></tr>");
	};
	
	this.getSaveButton = function() {
		var tr = $("<tr align=\"center\" valign=\"center\"></tr>");
		
		var text = $("<span>Сохранить</span>");
		var saveImg = $("<img src=\"" + self.css.iconSave + "\">");
	
		var imgTd = $("<td></td>").append(saveImg);
		var textTd = $("<td id=\"footprint_save\"></td>").append(text).css(self.css.td);

		return tr.append(imgTd).append(textTd);
	};
	
	this.getAutosaveButton = function() {
		var tr = $("<tr align=\"center\" valign=\"center\"></tr>");
		
		var text = $("<span>Авто</br>сохранение</span>");
		
		var syncOnImg = $("<img id=\"footprint_autosave_img_on\" src=\"" + self.css.iconSyncOn + "\">");
		var syncOffImg = $("<img id=\"footprint_autosave_img_off\" src=\"" + self.css.iconSyncOff + "\">");		
				
		var imgTd = $("<td></td>").append(syncOnImg).append(syncOffImg);
		var textTd = $("<td id=\"footprint_autosave\"></td>").append(text).css(self.css.td);
		
		if (localStorage['isEnableTraceAutosave'] == 'true') {
			syncOffImg.hide();
		}
		else {
			syncOnImg.hide();
		}
		
		return tr.append(imgTd).append(textTd);
	};
	
	this.getClearButton = function() {
		var tr = $("<tr align=\"center\" valign=\"center\"></tr>");	
	
		var text = $("<span>Очистить</span>");		
		var clearImg = $("<img src=\"" + self.css.iconDelete + "\">");
		
		var imgTd = $("<td></td>").append(clearImg);
		var textTd = $("<td id=\"footprint_clear\"></td>").append(text).css(self.css.td);
		
		return tr.append(imgTd).append(textTd);
	};
	

}
			
