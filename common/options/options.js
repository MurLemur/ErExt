var extensionOptionsClass = function(soundSelectOptions) {
	this.soundSelectOptions = soundSelectOptions;
	var self = this;
	
	this.init = function() {
		this.loadExtentionOption("options", defaultConfig.myoptions, function() {
			self.prepareOptionButtons();
		});
		this.loadExtentionOption("soptions", defaultConfig.soundOptions, function() {
			self.prepareSoundOptionsButtons(this.soundSelectOptions);
		});	
		this.loadExtentionOption("systemOptions", defaultConfig.systemOptions, function() {
			self.prepareSystemOptions();
		});
	};
	
	this.saveOptions = function(optionKey, optionValue) {
		kango.invokeAsync('kango.storage.setItem', optionKey, optionValue);
	}

	this.prepareSystemOptions = function() {
		$.each(defaultConfig.systemOptions, function(key) {
			$('#' + key).val(defaultConfig.systemOptions[key]).keyup(function() {
				defaultConfig.systemOptions[key] = $(this).val();
				self.saveOptions("systemOptions", defaultConfig.systemOptions);
			});
		});
	};
	this.prepareOptionButtons = function() {
		$.each(defaultConfig.myoptions, function(key) {
			$('#' + key).prop("checked", defaultConfig.myoptions[key]).on("click", function() {
				defaultConfig.myoptions[this.id] = $(this).prop("checked");
				self.saveOptions("options", defaultConfig.myoptions);
			});
		});		
	};
	
	this.prepareSoundOptionsButtons = function() {
		$.each(defaultConfig.soundOptions, function(key) {
			$('#' + key).html(self.soundSelectOptions).val(defaultConfig.soundOptions[key].sound).on("click", function() {
				defaultConfig.soundOptions[this.id].sound = $(this).val();
				self.saveOptions("soptions", defaultConfig.soundOptions);
			});
		});	
	};
	
	this.loadExtentionOption = function(optionKey, defaultOptions, callback) { 
		kango.invokeAsync('kango.storage.getItem', optionKey, function(value) { 
			defaultOptions = mergeOptions(value, defaultOptions);
			callback();
		});		
	}		
}

var extensionOptionsExportClass = function(popup) {
	this.popup = popup;
	this.exportLink = null;	
	this.exportButton = $("#exportButton");
	
	var self = this;
	
	this.erExtOptions = [
		{systemName: 'soptions', defaultName: "soundOptions"}, 
		{systemName: 'options', defaultName: "myoptions"}, 
		{systemName: 'systemOptions', defaultName: "systemOptions"}
	];
	
	this.init = function() {
		self._initExportButton();
		self._initImportButton();
		self._initExportLink();
		console.log(popup);
	}
	
	this._initExportButton = function() {
		self.exportButton.on('click', function() {
			tools.loadOptions(self.erExtOptions, self.exportToFile);
		});
	}
	
	this._initExportLink = function() {
		self.exportLink = $('<a download="er-ext-config.txt">').css({display: "none"});
		$('body').append(self.exportLink);
	}
	
	this.exportToFile = function(options) { 
		var optionsInJson = JSON.stringify(self.filterOptions(options));
		self._initFileDownload(optionsInJson);
	}
	
	this._initFileDownload = function(options) { 
		var hrefData = "data:text/plain;base64," + btoa(options);
		self.exportLink.attr('href', hrefData);			
		
		self.exportLink[0].click();
	}	

	this.filterOptions = function(options) {
		$.each(options, function(key) { 
			if (typeof self.optionFilters[key] !== 'undefined') {
				options[key] = self.optionFilters[key](this);
			}
		});			

		return options;
	}
	
	this.optionFilters = {
		soptions: function(soundOptions) {	
			$.each(soundOptions, function(key) {
				delete soundOptions[key].detect;
			});
			
			return soundOptions;
		}
	}		
	
	this._initImportButton = function() {
		var reader = self._initFileReader();
	
		$("#files").on("change", function() {			
			reader.readAsText(this.files[0], "windows-1251");
		});
	}
	
	this._initFileReader = function() {
		var reader = new FileReader();
		
		reader.loadstart = function() {
			self.popup.hide();
		}
		
		reader.onload = function() {		
			try {
				var config = $.parseJSON(event.target.result);
				self.importOptions(config);
				self._makeImportNotifictation('Импорт настроек прошел успешно. <br/>Страница будет перезагружена через 5 секунд.');
				
				setTimeout(function() {
					window.location.reload();
				}, 5000);
			}
			catch(error) {
				self._makeImportNotifictation('Не удалось импортировать настройки. Возможно файл поврежден.');
			}

		}
		
		reader.onerror = function() {
			self._makeImportNotifictation('Не удалось считать файл.');
		}
		
		return reader;
	}
	
	this._makeImportNotifictation = function(text) {
		var position = self.exportButton.position();
		self.popup.show($('<div>' + text + '</div>')).move(position.left + self.exportButton.width(), position.top, 0, -1 * self.exportButton.height());
	}
	
	this.importOptions = function(options) {
		$.each(options, function(key) {				
			if (typeof self.importFunctions[key] !== 'undefined') {
				self.importFunctions[key](this);
				return;
			}
			
			self.defaultImportFunction(this, key);				
		});
	}
	
	this.defaultImportFunction = function(option, optionKey) {
		kango.invokeAsync('kango.storage.setItem', optionKey, option);
	}
	
	this.importFunctions = {
		soptions: function(soundOptions) {
			kango.invokeAsync('kango.storage.getItem', 'soptions', function(options) { 
				$.each(options, function(key) {
					options[key].sound = soundOptions[key].sound;
				});	
			
				kango.invokeAsync('kango.storage.setItem', 'soptions', options);
			});						
		}
	}
}

KangoAPI.onReady(function() {
	var htmlopt = '<option value="nosound">Отключено</option>'+
      '<option value="sound1">Звук  1</option>'+
      '<option value="sound2">Звук  2</option>'+
      '<option value="sound3">Звук  3</option>'+
      '<option value="sound4">Звук  4</option>'+
      '<option value="sound5">Звук  5</option>'+
      '<option value="alarm">Звук  6</option>'+
      '<option value="chat">Звук 7</option>'+
      '<option value="fight">Звук  8</option>'+
      '<option value="fish">Звук  9</option>'+
      '<option value="mine">Звук 10</option>'+
      '<option value="msg">Звук 11</option>'+
      '<option value="trade">Звук 12</option>'+
      '<option value="wood">Звук 13</option>'+
      '<option value="work">Звук 14</option>';
	  
	var popup = new popupClass(popupCss);
	
	new extensionOptionsClass(htmlopt).init();
	new extensionOptionsExportClass(popup).init();
});