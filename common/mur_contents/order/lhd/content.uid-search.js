// ==UserScript==
// @name        uid-search
// @include     http://www.ereality.ru/ldh/*mode=51&*
// @require 	tools/jquery.js
// @require     tools.js
// @all-frames  true
// ==/UserScript==


var UidSearchClass = function() {
	this.ip = {
		'map': {},
		'set': $()
	};
	
	this.table = $('table:last');
	this.trs = this.table.find('tr');
	this.trsRows = this.trs.slice(1, this.trs.length - 1);
	
	var self = this;
	
	this.init = function() {
		self.prepareSets();
		self.prepareRadioPanel();
	}
	
	this.prepareSets = function() {
		self.trsRows.each(function(i) {
			var ip = $(this).find('td:eq(1)>a').text();

			if (typeof self.ip["map"][ip] == "undefined") {
				self.ip['map'][ip] = true; 
				self.ip['set'] = self.ip['set'].add(this);
			}	
		});
	};
	
	this.prepareRadioPanel = function() {
		var checkboxContainer = $('<div><b>Показывать:</b><br></div>');

		var allRadio = $('<span><label>Все<input type="radio" name="ext_redio" checked/></label></span><br>');
		var ipRadio = $('<span><label>Уникальные IP<input type="radio" name="ext_redio"/></label></span>');

		checkboxContainer.append(allRadio).append(ipRadio);
		self.table.before($("<br/><hr>")).before(checkboxContainer).before($("<br/><hr>"));

		allRadio.on('change', function() {
			self.trsRows.show();
		});

		ipRadio.on('change', function() {
			self.trsRows.hide();

			self.ip["set"].show();
		});
		
	}
}

$(document).ready(function() {
	new UidSearchClass().init();
});
