var popupClass = function(config) {
	var self = this;
	this.config = config;
	
	this.init = function() {
		if (self.config.unpaused) {
			$('#pause').show().click(function() {
				self.pauseListener(false, self.setImgOffLine);
			});
			self.setImgOnLine();
		}	  
		else {
			$('#unpause').show().click(function() {
				self.pauseListener(true, self.setImgOnLine);
			});
			self.setImgOffLine();
		}
		
		$("#titletext span").click(function() { 
			kango.browser.tabs.create({url:kango.getExtensionInfo().homepage_url}); 
		});
		
		$('#options').click(function() {
			kango.ui.optionsPage.open();
			window.close();
		});		
	};
	
	this.pauseListener = function(isPaused, setImgCallback) {
		self.config["unpaused"] = isPaused;
		
		kango.invokeAsync('kango.storage.setItem', "options", self.config);
		setImgCallback();
		
		if (config.tab_refresh) { 
			self.reloadPages();
		}
		
		KangoAPI.closeWindow();	
	};
	
	this.reloadPages = function() {
		kango.browser.tabs.getAll(function(tabs) {
			$.each(tabs, function() {
				var url = this.getUrl();
				
				if (url.search("http://www.ereality.ru") != -1) {
					this.navigate(url);
				}
			});
		});	
	};
	
	this.setImgOnLine = function() {
		kango.ui.browserButton.setIcon('icons/button.png'); 
	};
	
	this.setImgOffLine = function() {
		kango.ui.browserButton.setIcon('icons/buttong.png');
	};
}

KangoAPI.onReady(function() { 
	kango.invokeAsync('kango.storage.getItem', "options", function(value) { 
		new popupClass(mergeOptions(value, myoptions)).init();
	});
});