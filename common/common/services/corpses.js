var corpsesServiceClass = function (chatMsg) {
	this.chatMsg = chatMsg;
	this.corpseServiceLink = $("<a target=\"_blank\"></a>");
	
	var self = this;
	
	this.processClick = function() {
		if (self.chatMsg.val().length == 0) {
			return;
		} 
		
		self.corpseServiceLink.attr("href", 'http://cc.erclans.ru/viewpage.php?page_id=45#' + self.chatMsg.val());
		self.corpseServiceLink[0].click();
		
		self.chatMsg.val("");
	};
	
	this.init = function() {
		self.corpseServiceLink.hide();
		$("body").append(self.corpseServiceLink);
		$("img[src$='ch1_13.jpg']").on("click", self.processClick);
	};
}