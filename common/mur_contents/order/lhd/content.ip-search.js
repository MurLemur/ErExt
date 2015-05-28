// ==UserScript==
// @name        ip-search
// @include     http://www.ereality.ru/ldh/*mode=50&*
// @require 	tools/jquery.js
// @require     tools.js
// @all-frames  true
// ==/UserScript==

var IpSearchClass = function() {
	this.uid = {
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
			var uid = $(this).find('td:eq(1)>a').text();

			if (typeof self.uid["map"][uid] == "undefined") {
				self.uid['map'][uid] = true; 
				self.uid['set'] = self.uid['set'].add(this);
			}	
		});
	};
	
	this.prepareRadioPanel = function() {
		var checkboxContainer = $('<div><b>Показывать:</b><br></div>');

		var allRadio = $('<span><label>Все<input type="radio" name="ext_redio" checked/></label></span><br>');
		var uidRadio = $('<span><label>Уникальные UID<input type="radio" name="ext_redio"/></label></span>');

		checkboxContainer.append(allRadio).append(uidRadio);
		self.table.before($("<br/><hr>")).before(checkboxContainer).before($("<br/><hr>"));

		allRadio.on('change', function() {
			self.trsRows.show();
		});

		uidRadio.on('change', function() {
			self.trsRows.hide();

			self.uid["set"].show();
		});
		
	}
}

$(document).ready(function() {
	new IpSearchClass().init();
});
