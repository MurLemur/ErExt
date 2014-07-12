var estateVictimsClass = function() {	
	this.victimsList = {};

	this.maxVictimsAmount = 20;
	
	this.currentVictimsAmount = 0;
	
	var self = this;
	
	
	this.init = function(victimsList) {
		self.victimsList = victimsList;
		
		self.currentVictimsAmount = Object.keys(victimsList).length;
	};
	
	this.addVictim = function(victimName) {
		if (victimName.length == 0 || typeof self.victimsList[victimName] !== 'undefined' || self.currentVictimsAmount >= self.maxVictimsAmount) {
			return false;
		}
		
		self.currentVictimsAmount++;
		self.victimsList[victimName] = 0;		
	
		kango.invokeAsync('kango.storage.setItem', 'estatevictims', self.victimsList);
		
		return true;
	};
	
	this.removeVictim = function(victimName) {
		delete self.victimsList[victimName];
		self.currentVictimsAmount--;
		
		kango.invokeAsync('kango.storage.setItem', 'estatevictims', self.victimsList);
	};
	
	this.getVictimsList = function() {
		return self.victimsList;
	};
	
	this.getMaxVictimsAmount = function() {
		return self.maxVictimsAmount;
	};
	
	this.getCurrentVictimsAmount = function() {
		return self.currentVictimsAmount;
	}
}