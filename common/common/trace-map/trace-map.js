var traceMapClass = function(css, holder, popup) {
	this.css = css;
	this.popup = popup;
	this.isEnable = false;
	this.view;
	this.closeButtonId = 'er-ext-close-button';
	var self = this;

	this.buildLink = function() {
		var img = $("<img src=\"" + self.css.traceImgOff + "\">").on('click', function() {
			self.onPress($(this));
		});

		return $("<a title=\"След\"></a>").append(img).css(this.css.link);
	};

	this.onPress = function(traceImg) {
		this.popup.show(this.view).move(this.calculatePositionX(traceImg.offset().left), this.calculatePositionY(traceImg.offset().top), 0, 0);
		this.bindListeners();
	}

	this.prepareView = function() {
		this.view = $("<table class=\"textS\" cellspacing=\"4px\"></table>").css(self.css.table);
		
		this.view.append(this.getExitButton());	
		this.view.append(this.getTurnButton());
		this.view.append(this.getSaveButton());
		this.view.append(this.getAutosaveButton());		
		this.view.append(this.getClearButton());
	}
	
	this.init = function() {
		holder.parent().prepend(this.buildLink());
		this.prepareView();
	}
	
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
	};
	
	this.hide = function() {
		this.popup.hide();
		
		return this;
	};
	
	this.getExitButton = function() {
		return $("<tr><td colspan=\"2\" align=\"right\"><img id=\"" + this.closeButtonId + "\" src=\"" + self.css.iconClose + "\"></td></tr>");
	};
	
	this.getSaveButton = function() {
		var tr = $("<tr id=\"footprint_save\" align=\"center\" valign=\"center\"></tr>").css(self.css.tr);
		
		var text = $("<span>Сохранить</span>");
		var saveImg = $("<img src=\"" + self.css.iconSave + "\">");
	
		var imgTd = $("<td></td>").append(saveImg);
		var textTd = $("<td></td>").append(text);

		return tr.append(imgTd).append(textTd);
	}
	
	this.getAutosaveButton = function() {
		var tr = $("<tr align=\"center\" valign=\"center\" id=\"footprint_autosave\"></tr>").css(self.css.tr);
		
		var text = $("<span>Авто</br>сохранение</span>");
		
		var syncOnImg = $("<img id=\"footprint_autosave_img_on\" src=\"" + self.css.iconSyncOn + "\">");
		var syncOffImg = $("<img id=\"footprint_autosave_img_off\" src=\"" + self.css.iconSyncOff + "\">");		
				
		var imgTd = $("<td></td>").append(syncOnImg).append(syncOffImg);
		var textTd = $("<td></td>").append(text);
		
		if (localStorage['isEnableTraceAutosave'] == 'true') {
			syncOffImg.hide();
		}
		else {
			syncOnImg.hide();
		}
		
		return tr.append(imgTd).append(textTd);
	};
	
	this.getTurnButton = function() {
		var tr = $("<tr id=\"footprint_turn_on\" align=\"center\" valign=\"center\"></tr>").css(self.css.tr);
		
		var turnOnText = $("<span id=\"footprint_text_turn_on\">Выключить</span>");
		var turnOffText = $("<span id=\"footprint_text_turn_off\">Включить</span>");
		
		var turnOffImg = $("<img id=\"footprint_img_turn_off\" src=\"" + self.css.iconImgOff15 + "\">");
		var turnOnImg = $("<img id=\"footprint_img_turn_on\" src=\"" + self.css.iconImgOn15 + "\">");		
		
		var imgTd = $("<td></td>").append(turnOffImg).append(turnOnImg);
		var textTd = $("<td></td>").append(turnOnText).append(turnOffText);		
		
		if (localStorage['isEnableTrace'] == 'true') {
			turnOffImg.hide();
			turnOffText.hide();
		}
		else {
			turnOnImg.hide();
			turnOnText.hide();
		}
	
		return tr.append(imgTd).append(textTd);
	};
	
	this.getClearButton = function() {
		var tr = $("<tr id=\"footprint_clear\" align=\"center\" valign=\"center\"></tr>").css(self.css.tr);	
	
		var text = $("<span>Очистить</span>");		
		var clearImg = $("<img src=\"" + self.css.iconDelete + "\">");
		
		var imgTd = $("<td></td>").append(clearImg);
		var textTd = $("<td></td>").append(text);
		
		return tr.append(imgTd).append(textTd);
	};

}
			
