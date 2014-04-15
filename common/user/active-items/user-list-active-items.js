var usersListActiveItemsClass = function(usersHolderSelector, userItemSelector, messagingEnum, popup) {
	this.usersHolder = $("#div_users");	
	this.userItemSelector = userItemSelector;
	
	this.messagingEnum = messagingEnum;
	this.popup = popup;
	
	this.popupMarginX = 10;
	this.popupMarginY = 5;
	
	this.userName;
	this.responseHash;
	
	var self = this;
	
	this.init = function() {		
		this.initShowActiveItems();
		
		kango.addMessageListener(this.messagingEnum.usersListActiveItemsContent, function(event) {
			if (self.responseHash != event.data.hash) {
				return;
			}
			self.popup.show(itemsBuilder.build(event.data.items));
		});		
	};
	
	this.initShowActiveItems = function() {
		this.usersHolder.delegate(this.userItemSelector, "mouseenter", function(event) {
			if (!event.ctrlKey) {
				return;
			}

			self.userName = $(this).text();
			self.responseHash = self.userName + Date.now() + Math.floor((Math.random() * 100) + 1);
			
			kango.dispatchMessage(self.messagingEnum.userItemsBackground, {userName: self.userName, hash: self.responseHash});
			
			self.popup.showPreloader().move(event.clientX, event.client, self.popupMarginX, self.popupMarginY);
		}).delegate(this.userItemSelector, "mouseout", function(event) {
			if (self.responseHash === null) {
				return;
			}
		
			self.responseHash = null;
			self.popup.hide();	
		}).delegate(this.userItemSelector, "mousemove", function(event) {
			if (self.responseHash === null) {
				return;
			}
			
			self.popup.move(event.clientX, event.clientY, self.popupMarginX, self.popupMarginY);
		});	
	};
}