var battleCounterClass = function( popup, chatMsgSelector, css) {
	this.popup = popup;
	this.chatMsgSelector = chatMsgSelector;
	this.css = css;

	this.view;	
	this.hideTimer;	
	this.copyLinkId = "er-ext-copy-link";
	this.closeButtonId = "er-ext-close-button";
	this.battle_data = {"hcount":0,
						"gcount":0,
						"hmoney":0,
						"gmoney":0};
	
	var self = this;
//	this.init = function() {
//		this.prepareView();
//	};
	
 	this.prepareView = function() {		
		var bdata = localStorage["battle_data"];
		if (bdata) {
			var battle_data = JSON.parse(localStorage["battle_data"]);
			var now_dt = new Date();
			if (now_dt.getHours() < 4) date_now = now_dt.getDate() - 1
			else date_now = now_dt.getDate();
			if (date_now == battle_data.hdate) this.battle_data = battle_data;
		} 
		this.view = $("<table class=\"textS\"></table>");			
		this.view.append(this.getExitButton());	
		this.view.append("<tr style=\"color: #646464;font-weight: bold;\"><td> Хаотические:</td><td>"+this.battle_data.hcount+"</td><td> сер.</td><td>"+this.battle_data.hmoney+" </td></tr>");
		this.view.append("<tr style=\"color: #646464;font-weight: bold;\"><td> Групповые:</td><td>"+this.battle_data.gcount+"</td><td> сер.</td><td>"+this.battle_data.gmoney+" </td></tr>");	
		this.view.append("<tr style=\"color: #646464;font-weight: bold;\"><td> Итого:</td><td>"+(this.battle_data.hcount+this.battle_data.gcount)+"</td><td> сер.</td><td>"+(this.battle_data.hmoney+this.battle_data.gmoney)+" </td></tr>");	
		
		this.view.append(this.getCopyLink());
	};
	
	this.show = function(positionX, positionY) {
		this.prepareView();
		this.bindListeners();		
		this.popup.show(this.view).move(this.calculatePositionX(positionX), this.calculatePositionY(positionY), 0, 0);
		
		return this;
	};
	
	this.calculatePositionX = function(x) {
		return x -= this.view.width();
	};
	
	this.calculatePositionY = function(y) {
		return y -= this.view.height();
	};
	
	this.hide = function() {
		this.popup.hide();
		this.clearHideTimer();
		
		return this;
	};
	
	this.bindListeners = function() {
		this.view.find("#" + this.copyLinkId).on("click", function(){		
			self.copyToChat();
		});
		
		this.view.find("#" + this.closeButtonId).on("click", function() {
			$(this).attr("src", self.css.iconClose);
			self.hide();
		}).hover(function() {
			$(this).attr("src", self.css.iconCloseHover);
		}, function() {
			$(this).attr("src", self.css.iconClose);
		});
	};
	
	this.getCopyLink = function() {
		var link = $("<a id=\"" + this.copyLinkId + "\">Скопировать в чат</a>").css(this.css.copyLink);
		return $("<tr><td colspan=\"2\"></td></tr>").children().append(link);		
	};
	
	this.getExitButton = function() {
		return $("<tr><td></td><td></td><td></td><td colspan=\"2\" align=\"right\"><img id=\"" + this.closeButtonId + "\" src=\"" + self.css.iconClose + "\"></td></tr>");
	};
	
	this.copyToChat = function() {
		var chatMsg = "";	
		
		
			chatMsg += "Проведено боев : "+(this.battle_data.hcount+this.battle_data.gcount)+". Заработано : "+(this.battle_data.hmoney+this.battle_data.gmoney)+" сер.";
		
		
		$(this.chatMsgSelector).val(chatMsg);
	};
	
	this.hideAfter = function(hideTime) {	
		this.initHideTimer(hideTime);

		this.view.hover(function() {
			self.clearHideTimer();
		}, function() {
			self.initHideTimer(hideTime);
		});
		
		return this;
	};	
	
	this.initHideTimer = function(hideTime) {
		this.hideTimer = setTimeout(function(){
			self.hide();
		}, hideTime);
	};
	
	this.clearHideTimer = function() {
		clearTimeout(this.hideTimer);
	};
}