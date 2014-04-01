var extensionOptionsClass = function(soundSelectOptions) {
	this.soundSelectOptions = soundSelectOptions;
	var self = this;
	
	this.init = function() {
		this.loadExtentionOption("options", myoptions, function() {
			self.prepareOptionButtons();
		});
		this.loadExtentionOption("soptions", soundOptions, function() {
			self.prepareSoundOptionsButtons(this.soundSelectOptions);
		});	
		this.loadExtentionOption("systemOptions", systemOptions, function() {
			self.prepareSystemOptions();
		});
	};
	
	this.saveOptions = function(optionKey, optionValue) {
		kango.invokeAsync('kango.storage.setItem', optionKey, optionValue);
	}
	
	this.prepareOptionButtons = function() {
		$.each(myoptions, function(key) {
			$('#' + key).prop("checked", myoptions[key]).on("click", function() {
				myoptions[this.id] = $(this).prop("checked");
				self.saveOptions("options", myoptions);
			});
		});		
	};
	
	this.prepareSystemOptions = function() {
		$.each(systemOptions, function(key) {
			$('#' + key).val(systemOptions[key]).keyup(function() {
				systemOptions[key] = $(this).val();
				self.saveOptions("systemOptions", systemOptions);				
			});
		});
	};
	
	this.prepareSoundOptionsButtons = function() {
		$.each(soundOptions, function(key) {
			$('#' + key).html(self.soundSelectOptions).val(soundOptions[key].sound).on("click", function() {
				soundOptions[this.id].sound = $(this).val();
				self.saveOptions("soptions", soundOptions);
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
	  
	new extensionOptionsClass(htmlopt).init();
});

