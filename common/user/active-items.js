var userActiveItems = function(dataUrl, messagingEnum) {
	this.dataUrl = dataUrl;
	this.messagingEnum = messagingEnum;
}

userActiveItems.prototype = {
	requestId: 0,
	successStatus: 200,
	getItems : function(userName, hash) {
		var self = this;
		
		kango.browser.tabs.getCurrent(function(tab) {
			var requestId = self.requestId + 1;
			self.requestId = requestId;

			kango.xhr.send(self.prepareRequestParams(userName), function(data) {
				if (!self. checkResponse) {
					return;
				}
				
				var items;
				
				try {
					items = $.parseJSON(data.response);
				}
				catch(e) {
					items = {};
				}
			
				tab.dispatchMessage(self.messagingEnum.usersListActiveItemsContent, {items: items, hash: hash});
			});
		});
	},
	prepareRequestParams: function(userName) {
		return {
			url: this.dataUrl,
			method: 'GET',
			params: {
				user: userName
			},
			async: true,
			contentType: 'text'
		};	
	},
	checkResponse: function(data, requestId) {
		return data.status == this.successStatus && data.response != null && requestId == this.requestId;
	}
}
