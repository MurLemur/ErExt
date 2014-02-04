// ==UserScript==
// @name     ErExt_Users_List_Active_Items
// @include http://www.ereality.ru/core/*
// @require tools/jquery.js
// @require css/popup-css.js
// @require css/items-builder-css.js
// @require user/items-builder.js
// @require tools/popup.js
// @require tools/messaging-enum.js
// ==/UserScript==


var usersListActiveItemsClass = function(usersHolderSelector, userItemSelector, messagingEnum, popup) {
	this.usersHolder = $("#div_users");	
	this.userItemSelector = userItemSelector;
	
	this.messagingEnum = messagingEnum;
	this.popup = popup;
}

usersListActiveItemsClass.prototype = {
	responseHash: null,
	init: function() {
		var self = this;
		this.initShowActiveItems();
		
		kango.addMessageListener(this.messagingEnum.usersListActiveItemsContent, function(event) {
			if (self.responseHash != event.data.hash) {
				return;
			}
			self.popup.show(itemsBuilder.build(event.data.items));
		});		
	},	
	initShowActiveItems: function() {
		var self = this;
	
		this.usersHolder.delegate(this.userItemSelector, "mouseenter", function(event) {
			if (!event.ctrlKey) {
				return;
			}
		
			var userName = $(this).text();
			self.responseHash = userName + Date.now() + Math.floor((Math.random() * 100) + 1);
			
			kango.dispatchMessage(self.messagingEnum.userItemsBackground, {userName: userName, hash: self.responseHash});
			
			self.popup.move(event.clientX, event.clientY);
		}).delegate(this.userItemSelector, "mouseout", function(event) {
			self.responseHash = null;
			self.popup.hide();	
		}).delegate(this.userItemSelector, "mousemove", function(event) {
			self.popup.move(event.clientX, event.clientY);
		});	
	}
}

kango.invokeAsync('kango.storage.getItem', "options", function(options) {
	var megedOptions = mergeOptions(options, myoptions);

	if (megedOptions.unpaused && megedOptions.userlistactiveitems) {
		var usersListActiveItems = new  usersListActiveItemsClass("#div_users", "a[class=b]", messagingEnum, popup);
		usersListActiveItems.init();
	}	
});
